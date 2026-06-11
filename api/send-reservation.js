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

    // Send notification email to business
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

    // Send confirmation email to customer
const customerEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservation Request Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 40px 30px 0 30px; text-align: center; background-color: #0a0a0a; line-height: 0; font-size: 0;">
              <img src="https://www.dubalounge.com/logo-icon.webp" alt="Duba Logo" style="width: 100px; height: auto; display: block; margin: 0 auto;">
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 30px 24px 30px; text-align: center; background-color: #0a0a0a;">
              <h1 style="color: #F5C400; margin: 0; font-size: 26px; font-weight: bold;">We Have Received Your Reservation Request!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 30px 20px; color: #ffffff; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 15px;">Hello ${name},</p>
              <p style="margin: 0 0 15px;">Thank you for submitting your reservation request at Duba Karaoke Pub!</p>
              <p style="margin: 0; color: #cccccc;"><strong style="color: #ffffff;">Please note: your reservation is not yet confirmed.</strong> A Duba associate will contact you within 24 hours to confirm whether your requested time and room are available. If we are unable to accommodate your exact request, we will work with you to find the best available alternative.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; border-radius: 6px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="padding: 15px; background-color: #F5C400; color: #0a0a0a; font-weight: bold; font-size: 18px;">
                    Reservation Request Details
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a; width: 40%;">Name:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a;">Phone:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a;">Email:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a;">Date:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a;">Time In:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${timeIn}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a;">Time Out:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${timeOut}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold; border-bottom: 1px solid #2a2a2a;">Desired Room:</td>
                  <td style="padding: 12px 15px; color: #ffffff; border-bottom: 1px solid #2a2a2a;">${desiredRoom}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; color: #F5C400; font-weight: bold;">Special Requests:</td>
                  <td style="padding: 12px 15px; color: #ffffff;">${specialRequests || 'None'}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="padding: 10px; text-align: center;">
                    <p style="color: #F5C400; font-weight: bold; margin: 0 0 10px; font-size: 16px;">Questions? Contact Us</p>
                    <p style="color: #ffffff; margin: 5px 0;">📞 <a href="tel:215-635-3822" style="color: #F5C400; text-decoration: none;">215-635-3822</a></p>
                    <p style="color: #ffffff; margin: 5px 0;">📧 <a href="mailto:duba.elkins@gmail.com" style="color: #F5C400; text-decoration: none;">duba.elkins@gmail.com</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); border-radius: 6px; border: 2px solid #F5C400;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="color: #F5C400; font-weight: bold; margin: 0 0 10px; font-size: 18px;">Love Korean Food?</p>
                    <p style="color: #ffffff; margin: 0 0 15px; font-size: 14px;">Check out our sister restaurant for award-winning authentic Korean cuisine!</p>
                    <a href="https://duburestaurant.com" style="display: inline-block; padding: 12px 30px; background-color: #F5C400; color: #0a0a0a; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 16px;">Visit Dubu Restaurant</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #0a0a0a; border-top: 1px solid #2a2a2a;">
              <p style="color: #666666; margin: 0 0 10px; font-size: 12px;">This is an auto-generated email, do not reply.</p>
              <p style="color: #666666; margin: 0; font-size: 12px;">1333 W. Cheltenham Ave, Fl Basement, Elkins Park, PA 19027</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const { error: customerEmailError } = await resend.emails.send({
      from: 'Duba Reservations <reservations@dubalounge.com>',
      to: email,
      subject: 'Your Duba Reservation Request Has Been Received',
      html: customerEmailHtml,
    });

    if (customerEmailError) {
      console.error('Customer email error:', customerEmailError);
      // Don't fail the request if customer email fails - business email already sent
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
