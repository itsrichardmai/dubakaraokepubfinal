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

    // Format time to 12-hour format
    const formatTime = (time24) => {
      const [hours, minutes] = time24.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };

    const formattedTimeIn = formatTime(timeIn);
    const formattedTimeOut = formatTime(timeOut);

    const emailContent = `New reservation request from your website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Date: ${date}
Time: ${formattedTimeIn} - ${formattedTimeOut}
Room: ${desiredRoom}
Promo Package: ${promoPackage || 'None selected'}
Special Requests: ${specialRequests || 'None'}

---
Submitted via DubaKaraoke.com`;

    const { data, error } = await resend.emails.send({
      from: 'Duba Reservations <onboarding@resend.dev>',
      to: 'duba.elkins@gmail.com',
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
