import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Gmail SMTP Credentials (fallback to provided App Password)
const GMAIL_USER = process.env.GMAIL_USER || 'dbaidya811@gmail.com';
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || 'yjce elkr qowk frza').replace(/\s+/g, '');

// Reusable Nodemailer Transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.warn('[SMTP Warning] Gmail transporter verification issue:', error.message);
  } else {
    console.log('[SMTP Ready] Gmail transporter connected successfully with', GMAIL_USER);
  }
});

interface MeetingBookingRequest {
  attendeeName: string;
  attendeeEmail: string;
  companyName?: string;
  budgetSlab?: string;
  meetingTopic?: string;
  meetingTitle: string;
  meetingDuration: string;
  meetingDate: string; // e.g., "Monday, 13 Oct"
  rawDate?: string;    // e.g., "2026-10-13"
  meetingTime: string; // e.g., "03:00 PM"
  timezone: string;
}

// Config endpoint for client
app.get('/api/meeting-config', (_req, res) => {
  res.json({
    hostEmail: GMAIL_USER,
  });
});

// API endpoint to send meeting booking emails (Clean email-based booking without Google Meet)
app.post('/api/send-meeting-emails', async (req, res) => {
  try {
    const {
      attendeeName,
      attendeeEmail,
      companyName,
      budgetSlab,
      meetingTopic,
      meetingTitle,
      meetingDuration,
      meetingDate,
      meetingTime,
      timezone,
    } = req.body as MeetingBookingRequest;

    if (!attendeeName || !attendeeEmail || !meetingDate || !meetingTime) {
      return res.status(400).json({ error: 'Missing required booking details.' });
    }

    const hostEmail = GMAIL_USER;

    // 1. Email to the Client / Attendee
    const attendeeHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 32px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Meeting Scheduled! 🎉</h1>
          <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Your 1:1 session with Deep Baidya is confirmed</p>
        </div>

        <div style="padding: 28px 24px;">
          <p style="font-size: 15px; color: #18181b; margin-top: 0;">Hi <strong>${attendeeName}</strong>,</p>
          <p style="font-size: 14px; color: #52525b; line-height: 1.6;">
            Thank you for scheduling a call. Your booking request has been confirmed. Deep Baidya has received your request and will reach out to you directly via this email (<a href="mailto:${attendeeEmail}" style="color: #2563eb;">${attendeeEmail}</a>) to connect.
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 140px;">📅 Date & Time:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${meetingDate} @ ${meetingTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">🌍 Timezone:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${timezone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">⏱️ Duration:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${meetingDuration} (${meetingTitle})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: 500;">💬 Agenda / Topic:</td>
                <td style="padding: 8px 0; color: #0f172a;">${meetingTopic || 'Project Discussion & Consultation'}</td>
              </tr>
              ${companyName ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">🏢 Company:</td><td style="padding: 8px 0; color: #0f172a;">${companyName}</td></tr>` : ''}
              ${budgetSlab ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">💼 Budget:</td><td style="padding: 8px 0; color: #0f172a;">${budgetSlab}</td></tr>` : ''}
            </table>
          </div>

          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: 500;">
              ✨ If you need to make changes or share extra project documents beforehand, simply reply directly to <a href="mailto:${hostEmail}" style="color: #2563eb; font-weight: 700;">${hostEmail}</a>.
            </p>
          </div>
        </div>

        <div style="background: #fafafa; padding: 16px 24px; text-align: center; font-size: 12px; color: #a1a1aa; border-top: 1px solid #f4f4f5;">
          Deep Baidya • Full-Stack Engineer • <a href="mailto:${hostEmail}" style="color: #71717a;">${hostEmail}</a>
        </div>
      </div>
    `;

    // 2. Email to the Host (Deep Baidya)
    const hostHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #059669, #047857); padding: 28px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800;">New Meeting Scheduled! 🚀</h1>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Booking received from your Portfolio website</p>
        </div>

        <div style="padding: 28px 24px;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px; color: #166534; font-size: 15px;">👤 Attendee Information</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #4b5563; width: 120px;">Name:</td><td style="padding: 6px 0; color: #111827; font-weight: 700;">${attendeeName}</td></tr>
              <tr><td style="padding: 6px 0; color: #4b5563;">Email:</td><td style="padding: 6px 0; color: #111827;"><a href="mailto:${attendeeEmail}" style="color: #2563eb; font-weight: 600;">${attendeeEmail}</a></td></tr>
              ${companyName ? `<tr><td style="padding: 6px 0; color: #4b5563;">Company:</td><td style="padding: 6px 0; color: #111827;">${companyName}</td></tr>` : ''}
              ${budgetSlab ? `<tr><td style="padding: 6px 0; color: #4b5563;">Budget Slab:</td><td style="padding: 6px 0; color: #111827; font-weight: 600;">${budgetSlab}</td></tr>` : ''}
            </table>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px; color: #1e293b; font-size: 15px;">🗓️ Meeting Details</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; color: #64748b; width: 120px;">Format:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${meetingTitle} (${meetingDuration})</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Date & Time:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${meetingDate} @ ${meetingTime}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Timezone:</td><td style="padding: 6px 0; color: #0f172a;">${timezone}</td></tr>
              <tr><td style="padding: 6px 0; color: #64748b;">Discussion:</td><td style="padding: 6px 0; color: #0f172a;">${meetingTopic || 'No specific agenda stated'}</td></tr>
            </table>
          </div>

          <div style="text-align: center; margin: 24px 0 16px;">
            <a href="mailto:${attendeeEmail}?subject=Re:%20${encodeURIComponent(meetingTitle + ' Consultation with Deep Baidya')}" style="display: inline-block; background: #059669; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 8px; font-weight: 700; font-size: 14px;">
              ✉️ Reply Directly to ${attendeeName}
            </a>
          </div>
        </div>
      </div>
    `;

    // Send emails simultaneously via Nodemailer
    const [attendeeResult, hostResult] = await Promise.all([
      transporter.sendMail({
        from: `"Deep Baidya" <${hostEmail}>`,
        to: attendeeEmail,
        subject: `Confirmed: ${meetingTitle} with Deep Baidya (${meetingDate} @ ${meetingTime})`,
        html: attendeeHtml,
      }),
      transporter.sendMail({
        from: `"Portfolio Booking System" <${hostEmail}>`,
        to: hostEmail,
        replyTo: attendeeEmail,
        subject: `New Meeting Booking: ${attendeeName} (${meetingDate} @ ${meetingTime})`,
        html: hostHtml,
      }),
    ]);

    console.log('[SMTP Success] Emails sent successfully to', attendeeEmail, 'and host', hostEmail);

    return res.json({
      success: true,
      message: 'Meeting confirmed and emails sent to both attendee and host.',
      attendeeMessageId: attendeeResult.messageId,
      hostMessageId: hostResult.messageId,
    });
  } catch (err: any) {
    console.error('[SMTP Error] Failed to send meeting emails:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to dispatch meeting emails.',
    });
  }
});

// API endpoint for direct Contact Form submissions
app.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, service, budget, timeline, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const hostEmail = GMAIL_USER;
    const contactHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 28px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800;">New Project Inquiry! 📩</h1>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Message received from your Portfolio website</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 100px;">From:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${name} (<a href="mailto:${email}">${email}</a>)</td></tr>
            ${service ? `<tr><td style="padding: 6px 0; color: #64748b;">Service:</td><td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${service}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding: 6px 0; color: #64748b;">Budget:</td><td style="padding: 6px 0; color: #0f172a;">${budget}</td></tr>` : ''}
            ${timeline ? `<tr><td style="padding: 6px 0; color: #64748b;">Timeline:</td><td style="padding: 6px 0; color: #0f172a;">${timeline}</td></tr>` : ''}
          </table>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
            <h4 style="margin: 0 0 8px; color: #334155;">Message:</h4>
            <p style="margin: 0; color: #0f172a; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 24px;">
            <a href="mailto:${email}?subject=Re:%20Your%20Inquiry%20to%20Deep%20Baidya" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px;">
              ✉️ Reply to ${name}
            </a>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${hostEmail}>`,
      to: hostEmail,
      replyTo: email,
      subject: `New Inquiry from ${name} (${service || 'General'})`,
      html: contactHtml,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err: any) {
    console.error('[Contact SMTP Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Vite Middleware integration for dev mode / Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();
