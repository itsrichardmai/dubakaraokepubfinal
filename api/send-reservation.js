import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, date, timeIn, timeOut, promoPackage, desiredRoom, specialRequests } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !date || !timeIn || !timeOut || !desiredRoom) {
      return res.status(400).json({ error: 'Missing required fields' });
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
Promo Package: ${promoPackage || 'None selected'}
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
