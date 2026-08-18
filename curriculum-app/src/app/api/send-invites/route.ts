import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/firebaseAdmin';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { batchId, template, subject } = await request.json();

    if (!batchId || !template) {
      return NextResponse.json({ success: false, error: 'Missing batchId or template' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json({ 
        success: false, 
        error: 'Gmail SMTP credentials missing. Please configure GMAIL_USER and GMAIL_APP_PASSWORD in .env.local' 
      }, { status: 500 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Fetch students in this batch
    const studentsSnapshot = await adminDb.collection('students').where('batchId', '==', batchId).get();
    
    if (studentsSnapshot.empty) {
      return NextResponse.json({ success: false, error: 'No students found in this batch' }, { status: 404 });
    }

    const results = [];

    // Send emails
    for (const doc of studentsSnapshot.docs) {
      const studentData = doc.data();
      const email = studentData.email;
      const initialPassword = studentData.initialPassword || 'Password reset required';
      const name = studentData.name || 'Student';

      // Replace placeholders
      let personalizedContent = template
        .replace(/{{email}}/g, email)
        .replace(/{{password}}/g, initialPassword)
        .replace(/{{name}}/g, name);

      try {
        await transporter.sendMail({
          from: `"The Career Breweries" <${gmailUser}>`,
          to: email,
          subject: subject || 'Your Workshop Credentials',
          text: personalizedContent,
        });

        results.push({ email, success: true });
      } catch (err: any) {
        console.error(`Error sending email to ${email}:`, err);
        results.push({ email, success: false, error: err.message });
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (error: any) {
    console.error("Error in /api/send-invites:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
