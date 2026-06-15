import { google } from 'googleapis';

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

function getRoomKey(desiredRoom) {
  const lower = desiredRoom.toLowerCase();
  if (lower.includes('brooklyn')) return 'brooklyn';
  if (lower.includes('heineken')) return 'heineken';
  if (lower.includes('budweiser')) return 'budweiser';
  if (lower.includes('factory')) return 'factory';
  if (lower.includes('lounge')) return 'lounge';
  return 'small';
}

function extractRoomFromTitle(title) {
  const match = title.match(/\(([^)]+)\)/);
  if (!match) return null;
  return match[1].toLowerCase().trim();
}

function isSmallRoom(abbr) {
  return ['sm', 'small', 'coor', 'coors', 'guin', 'guinness'].includes(abbr);
}

function isDedicatedRoom(abbr, roomKey) {
  const ROOM_MAP = {
    brooklyn: ['brook', 'brooklyn'],
    heineken: ['hein', 'heineken'],
    budweiser: ['bud', 'budw', 'budweiser'],
    factory: ['fact', 'factory'],
    lounge: ['lou', 'lounge'],
  };
  return (ROOM_MAP[roomKey] || []).includes(abbr);
}

function timeToMinutes(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  // Handle after midnight times (1AM, 2AM = next day)
  if (period === 'AM' && hours < 5) hours += 24;
  return hours * 60 + minutes;
}

function timesOverlap(eventStart, eventEnd, requestStart, requestEnd) {
  const eStart = timeToMinutes(eventStart);
  const eEnd = timeToMinutes(eventEnd);
  const rStart = timeToMinutes(requestStart);
  const rEnd = timeToMinutes(requestEnd);
  return eStart < rEnd && eEnd > rStart;
}

function addMinutesToDateTime(dateTimeStr, minutesToAdd) {
  const date = new Date(dateTimeStr);
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
  });
}

function isSlotWithinEventWindow(slotTime, bufferedStartTime, bufferedEndTime) {
  const slotMinutes = timeToMinutes(slotTime);
  const startMinutes = timeToMinutes(bufferedStartTime);
  const endMinutes = timeToMinutes(bufferedEndTime);
  return slotMinutes >= startMinutes && slotMinutes < endMinutes;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date, desiredRoom } = req.body;

  if (!date || !desiredRoom) {
    return res.status(400).json({ error: 'Missing date or room' });
  }

  const cacheKey = `${date}-${desiredRoom}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const dayStart = new Date(`${date}T00:00:00-05:00`).toISOString();
    const dayEnd = new Date(`${date}T23:59:59-05:00`).toISOString();

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: dayStart,
      timeMax: dayEnd,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    const roomKey = getRoomKey(desiredRoom);
    const isSmall = roomKey === 'small';
    const bookedSlots = [];

    const TIME_SLOTS = [
      '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
      '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
      '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM'
    ];

    if (isSmall) {
      // For small rooms, track how many small rooms are booked per time slot
      const slotCount = {};
      TIME_SLOTS.forEach(slot => slotCount[slot] = 0);

      for (const event of events) {
        const title = event.summary || '';
        const abbr = extractRoomFromTitle(title);

        if (!abbr || !isSmallRoom(abbr)) continue;

        const eventStart = event.start.dateTime;
        const eventEnd = event.end.dateTime;
        if (!eventStart || !eventEnd) continue;

        // NO BUFFER for small rooms - use exact event times
        const startTime = new Date(eventStart).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
        });
        const endTime = new Date(eventEnd).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
        });

        TIME_SLOTS.forEach(slot => {
          if (isSlotWithinEventWindow(slot, startTime, endTime)) {
            slotCount[slot]++;
          }
        });
      }

      // A slot is booked if all 4 small rooms are taken
      TIME_SLOTS.forEach(slot => {
        if (slotCount[slot] >= 4) {
          bookedSlots.push(slot);
        }
      });

    } else {
      // Dedicated room — check if room is booked at each slot
      for (const event of events) {
        const title = event.summary || '';
        const abbr = extractRoomFromTitle(title);

        if (!abbr || !isDedicatedRoom(abbr, roomKey)) continue;

        const eventStart = event.start.dateTime;
        const eventEnd = event.end.dateTime;
        if (!eventStart || !eventEnd) continue;

        // Convert event times to time strings first
        const startTime = new Date(eventStart).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
        });
        const endTime = new Date(eventEnd).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
        });

        // Convert event times to minutes, add buffer, then check each slot
        const eventStartMinutes = timeToMinutes(startTime) - 30; // 30 min pre-buffer
        const eventEndMinutes = timeToMinutes(endTime) + 30; // 30 min post-buffer

        TIME_SLOTS.forEach(slot => {
          const slotMinutes = timeToMinutes(slot);
          if (slotMinutes >= eventStartMinutes && slotMinutes < eventEndMinutes) {
            bookedSlots.push(slot);
          }
        });
      }
    }

    const result = { bookedSlots: [...new Set(bookedSlots)], error: false };
    setCache(cacheKey, result);
    return res.status(200).json(result);

  } catch (err) {
    console.error('=== ERROR CAUGHT ===');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('=== FULL ERROR:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    console.error('Error response data:', err.response?.data);
    console.error('Error response status:', err.response?.status);
    console.error('Error config:', err.config);
    return res.status(200).json({ bookedSlots: [], error: true });
  }
}
