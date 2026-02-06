import { Resend } from 'resend';

export default async function handler(req, res) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, date, timeIn, timeOut, promoPackage, desiredRoom, specialRequests } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !date || !timeIn || !timeOut || !desiredRoom) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Valid time slots
    const validTimeSlots = [
      '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
      '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
      '11:00 PM', '11:30 PM', '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM'
    ];

    // Validate time slots
    if (!validTimeSlots.includes(timeIn) || !validTimeSlots.includes(timeOut)) {
      return res.status(400).json({ error: 'Invalid time selection.' });
    }

    // Validate time out is after time in
    const timeInIndex = validTimeSlots.indexOf(timeIn);
    const timeOutIndex = validTimeSlots.indexOf(timeOut);
    if (timeOutIndex <= timeInIndex) {
      return res.status(400).json({ error: 'Time out must be later than Time in.' });
    }

    // Validate date format and value
    const dateObj = new Date(date + 'T00:00:00');
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Please select a valid date.' });
    }

    // Date must be today or in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj < today) {
      return res.status(400).json({ error: 'Reservation date must be today or a future date.' });
    }

    // Date must be within 2 years
    const twoYearsFromNow = new Date();
    twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
    if (dateObj > twoYearsFromNow) {
      return res.status(400).json({ error: 'Reservations cannot be made more than 2 years in advance.' });
    }

    // Format date to readable format (e.g., "February 3, 2026")
    const formatDate = (dateString) => {
      const dateObj = new Date(dateString + 'T00:00:00');
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const formattedDate = formatDate(date);

    const emailContent = `New reservation request from your website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Date: ${formattedDate}
Time: ${timeIn} - ${timeOut}
Room: ${desiredRoom}
Special Requests: ${specialRequests || 'None'}

---
Submitted via DubaKaraoke.com`;

    const { data, error } = await resend.emails.send({
      from: 'Duba Reservations <reservations@dubalounge.com>',
      to: 'duba.elkins@gmail.com',
      replyTo: 'duba.elkins@gmail.com',
      subject: `New Reservation Request - ${name}`,
      text: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
