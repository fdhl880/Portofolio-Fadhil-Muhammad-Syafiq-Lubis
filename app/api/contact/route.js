import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting - simple in-memory store
const rateLimit = new Map();

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 3;

    // Check rate limit
    const requests = rateLimit.get(ip) || [];
    const recentRequests = requests.filter(t => now - t < windowMs);
    if (recentRequests.length >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);

    // Parse body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Check if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'Fadhilsyafiq90@gmail.com';

    if (!smtpHost || !smtpUser || !smtpPass) {
      // If SMTP not configured, log and return success (for development)
      console.log('Contact form submission (SMTP not configured):');
      console.log({ name, email, subject, message });
      return NextResponse.json({ success: true, note: 'Message logged (SMTP not configured)' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00f0ff; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Sent from your portfolio website contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
