import { google } from 'googleapis';

const cache = new Map();
const CACHE_TTL = 0; // TEMPORARILY DISABLED FOR DEBUGGING

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

function isSlotWithinEventWindow(slotTime, bufferedStartTime, bufferedEndTime, logDetails = false) {
  const slotMinutes = timeToMinutes(slotTime);
  const startMinutes = timeToMinutes(bufferedStartTime);
  const endMinutes = timeToMinutes(bufferedEndTime);

  const isBlocked = slotMinutes >= startMinutes && slotMinutes < endMinutes;

  // Log detailed comparison for debugging
  if (logDetails) {
    console.error(`  Checking slot: ${slotTime} (${slotMinutes} mins)`);
    console.error(`  Against window: ${bufferedStartTime} (${startMinutes} mins) to ${bufferedEndTime} (${endMinutes} mins)`);
    console.error(`  ${slotMinutes} >= ${startMinutes} = ${slotMinutes >= startMinutes}`);
    console.error(`  ${slotMinutes} < ${endMinutes} = ${slotMinutes < endMinutes}`);
    console.error(`  Result: ${isBlocked ? 'BLOCKED' : 'AVAILABLE'}`);
  }

  // Slot is blocked if it falls within the buffered event window
  return isBlocked;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date, desiredRoom } = req.body;

  console.error('=== API CALLED ===');
  console.error('Date:', date);
  console.error('Desired Room:', desiredRoom);

  if (!date || !desiredRoom) {
    return res.status(400).json({ error: 'Missing date or room' });
  }

  const cacheKey = `${date}-${desiredRoom}`;
  const cached = getCached(cacheKey);
  if (cached) {
    console.error('=== CACHE HIT - returning cached data ===');
    console.error('Cached result:', cached);
    return res.status(200).json(cached);
  }

  console.error('=== CACHE MISS - calling Google Calendar === (cache disabled with TTL=0)');

  try {
    console.error('=== AUTHENTICATING WITH GOOGLE ===');
    console.error('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.error('Calendar ID:', process.env.GOOGLE_CALENDAR_ID);
    console.error('Private Key exists:', !!process.env.GOOGLE_PRIVATE_KEY);

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    console.error('=== AUTH CREATED ===');

    const calendar = google.calendar({ version: 'v3', auth });

    console.error('=== CALENDAR INSTANCE CREATED ===');

    const dayStart = new Date(`${date}T00:00:00-05:00`).toISOString();
    const dayEnd = new Date(`${date}T23:59:59-05:00`).toISOString();

    console.error('=== FETCHING CALENDAR EVENTS ===');
    console.error('Time range:', dayStart, 'to', dayEnd);

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: dayStart,
      timeMax: dayEnd,
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.error('=== EVENTS FETCHED ===');

    const events = response.data.items || [];
    console.error('EVENTS FOUND:', JSON.stringify(events.map(e => ({ summary: e.summary, start: e.start.dateTime }))));
    console.error(`=== EVENTS FETCHED: ${events.length} events found ===`);

    if (events.length > 0) {
      console.error('=== INDIVIDUAL EVENTS ===');
      events.forEach((event, index) => {
        console.error(`=== EVENT ${index + 1}: ${event.summary} | start: ${event.start.dateTime || event.start.date} | end: ${event.end.dateTime || event.end.date} ===`);
      });
    }

    console.error('=== RAW EVENTS RETURNED ===');
    console.error('Total events found:', events.length);
    console.error('Raw events:', JSON.stringify(events, null, 2));

    const roomKey = getRoomKey(desiredRoom);
    const isSmall = roomKey === 'small';
    const bookedSlots = [];

    console.error('=== ROOM PROCESSING ===');
    console.error('Room key:', roomKey);
    console.error('Is small room:', isSmall);

    const TIME_SLOTS = [
      '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
      '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
      '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM'
    ];

    if (isSmall) {
      console.error('=== PROCESSING SMALL ROOMS ===');
      // For small rooms, track how many small rooms are booked per time slot
      const slotCount = {};
      TIME_SLOTS.forEach(slot => slotCount[slot] = 0);

      for (const event of events) {
        const title = event.summary || '';
        const abbr = extractRoomFromTitle(title);
        console.error('Event title:', title);
        console.error('Extracted room abbr:', abbr);
        console.error('Is small room:', abbr ? isSmallRoom(abbr) : 'N/A');

        if (!abbr || !isSmallRoom(abbr)) continue;

        const eventStart = event.start.dateTime;
        const eventEnd = event.end.dateTime;
        if (!eventStart || !eventEnd) {
          console.error('Event missing dateTime, skipping');
          continue;
        }

        // NO BUFFER for small rooms - use exact event times
        const startTime = new Date(eventStart).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
        });
        const endTime = new Date(eventEnd).toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York'
        });

        console.error('Event times (NO buffer for small rooms):', startTime, '-', endTime);

        const blockedSlotsForThisEvent = [];
        TIME_SLOTS.forEach(slot => {
          if (isSlotWithinEventWindow(slot, startTime, endTime, true)) {
            slotCount[slot]++;
            blockedSlotsForThisEvent.push(slot);
            console.error(`Slot ${slot} count increased to ${slotCount[slot]}`);
          }
        });
        console.error(`Blocked slots for this event: [${blockedSlotsForThisEvent.join(', ')}]`);
      }

      // A slot is booked if all 4 small rooms are taken
      console.error('Final slot counts:', slotCount);
      TIME_SLOTS.forEach(slot => {
        if (slotCount[slot] >= 4) {
          bookedSlots.push(slot);
          console.error(`Slot ${slot} is fully booked (${slotCount[slot]} rooms)`);
        }
      });

    } else {
      console.error('=== PROCESSING DEDICATED ROOM ===');
      // Dedicated room — check if room is booked at each slot
      for (const event of events) {
        const title = event.summary || '';
        const abbr = extractRoomFromTitle(title);
        console.error('Event title:', title);
        console.error('Extracted room abbr:', abbr);
        console.error('Is dedicated room match:', abbr ? isDedicatedRoom(abbr, roomKey) : 'N/A');

        if (!abbr || !isDedicatedRoom(abbr, roomKey)) continue;

        const eventStart = event.start.dateTime;
        const eventEnd = event.end.dateTime;
        if (!eventStart || !eventEnd) {
          console.error('Event missing dateTime, skipping');
          continue;
        }

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

        console.error('Event:', startTime, '-', endTime, '| Buffered:', eventStartMinutes, '-', eventEndMinutes);

        const blockedSlotsForThisEvent = [];
        TIME_SLOTS.forEach(slot => {
          const slotMinutes = timeToMinutes(slot);
          console.error(`  Checking slot ${slot} (${slotMinutes} mins) against buffered range ${eventStartMinutes}-${eventEndMinutes}`);
          if (slotMinutes >= eventStartMinutes && slotMinutes < eventEndMinutes) {
            bookedSlots.push(slot);
            blockedSlotsForThisEvent.push(slot);
            console.error(`  ✓ Slot ${slot} blocked by this event`);
          }
        });
        console.error(`Blocked slots for event "${title}": [${blockedSlotsForThisEvent.join(', ')}]`);
      }
    }

    const result = { bookedSlots: [...new Set(bookedSlots)], error: false };
    console.error('=== FINAL RESULT ===');
    console.error('Booked slots:', result.bookedSlots);
    console.error('Total booked slots:', result.bookedSlots.length);

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
