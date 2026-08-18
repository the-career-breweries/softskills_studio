"use server";

import { adminAuth, adminDb } from '@/lib/firebase/firebaseAdmin';
import nodemailer from 'nodemailer';

function generateRandomPassword(length = 8) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export async function createBatchAction(batchName: string, emails: string[], totalDays: number = 5) {
  try {
    // 1. Create the Batch document
    const batchRef = adminDb.collection('batches').doc();
    const batchId = batchRef.id;

    const emailTemplate = `Welcome to the ${batchName} Bootcamp!
Your login credentials are:
Email: {{email}}
Password: {{password}}

Login at: https://yourdomain.com/workshops/student
`;

    await batchRef.set({
      name: batchName,
      createdAt: new Date().toISOString(),
      emailTemplate,
      studentCount: emails.length,
      totalDays: totalDays,
    });

    const results = [];

    // 2. Create Firebase Auth users and store them in the 'students' collection
    for (const email of emails) {
      const cleanEmail = email.trim();
      if (!cleanEmail) continue;

      const password = generateRandomPassword(8);
      
      let userRecord;
      try {
        // Create user in Firebase Auth
        userRecord = await adminAuth.createUser({
          email: cleanEmail,
          password: password,
          displayName: `Student (${batchName})`,
        });

        // Create student document in Firestore
        await adminDb.collection('students').doc(userRecord.uid).set({
          email: cleanEmail,
          batchId: batchId,
          progress: {
            day: 1,
            state: 'MORNING_VIDEO'
          },
          initialPassword: password,
          phone: '',
          name: `Student (${batchName})`,
          createdAt: new Date().toISOString()
        });

        results.push({ email: cleanEmail, password, success: true });
      } catch (userErr: any) {
        console.error(`Error creating user ${cleanEmail}:`, userErr);
        results.push({ email: cleanEmail, password: '', success: false, error: userErr.message });
      }
    }

    return {
      success: true,
      batchId,
      students: results
    };
  } catch (error: any) {
    console.error("Error in createBatchAction:", error);
    return { success: false, error: error.message };
  }
}

export interface CSVStudentData {
  name: string;
  email: string;
  phone: string;
  workshopDays: number;
}

export async function uploadStudentsCSVAction(batchBaseName: string, students: CSVStudentData[]) {
  try {
    const results = [];
    
    // Group students by workshopDays
    const groupedStudents: Record<number, CSVStudentData[]> = {};
    for (const student of students) {
      if (!groupedStudents[student.workshopDays]) {
        groupedStudents[student.workshopDays] = [];
      }
      groupedStudents[student.workshopDays].push(student);
    }
    
    const batchIdsCreated = [];
    
    for (const [daysStr, group] of Object.entries(groupedStudents)) {
      const days = parseInt(daysStr, 10);
      const batchName = `${batchBaseName} (${days}-Day)`;
      
      const batchRef = adminDb.collection('batches').doc();
      const batchId = batchRef.id;
      batchIdsCreated.push(batchId);
      
      const emailTemplate = `Welcome to the ${batchName} Bootcamp!
Your login credentials are:
Email: {{email}}
Password: {{password}}

Login at: https://yourdomain.com/workshops/student
`;
      
      await batchRef.set({
        name: batchName,
        createdAt: new Date().toISOString(),
        emailTemplate,
        studentCount: group.length,
        totalDays: days,
      });
      
      for (const student of group) {
        const cleanEmail = student.email.trim();
        if (!cleanEmail) continue;
        
        const password = generateRandomPassword(8);
        
        try {
          let userRecord;
          try {
            // Check if user exists
            userRecord = await adminAuth.getUserByEmail(cleanEmail);
            // If they exist, we just update their password so we can send it in the CSV.
            await adminAuth.updateUser(userRecord.uid, { password });
          } catch (e: any) {
            // Create new
            userRecord = await adminAuth.createUser({
              email: cleanEmail,
              password: password,
              displayName: student.name,
            });
          }
          
          await adminDb.collection('students').doc(userRecord.uid).set({
            email: cleanEmail,
            batchId: batchId,
            progress: {
              day: 1,
              state: 'MORNING_VIDEO'
            },
            initialPassword: password,
            name: student.name,
            phone: student.phone,
            createdAt: new Date().toISOString()
          }, { merge: true });
          
          results.push({ name: student.name, email: cleanEmail, password, success: true, batchId, days });
        } catch (userErr: any) {
          console.error(`Error creating user ${cleanEmail}:`, userErr);
          results.push({ name: student.name, email: cleanEmail, password: '', success: false, error: userErr.message, batchId, days });
        }
      }
    }
    
    return {
      success: true,
      batchIds: batchIdsCreated,
      students: results
    };
  } catch (error: any) {
    console.error("Error in uploadStudentsCSVAction:", error);
    return { success: false, error: error.message };
  }
}

export async function getBatchesAction() {
  try {
    const snapshot = await adminDb.collection('batches').orderBy('createdAt', 'desc').get();
    const batches = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, batches };
  } catch (error: any) {
    console.error("Error fetching batches:", error);
    return { success: false, error: error.message };
  }
}

export async function getRegistrationsAction() {
  try {
    const snapshot = await adminDb.collection('registrations').orderBy('createdAt', 'desc').get();
    const registrations = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
      };
    });
    return { success: true, registrations };
  } catch (error: any) {
    console.error("Error fetching registrations:", error);
    return { success: false, error: error.message };
  }
}

export async function getStudentsByBatchAction(batchId: string) {
  try {
    const snapshot = await adminDb.collection('students').where('batchId', '==', batchId).get();
    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, students };
  } catch (error: any) {
    console.error("Error fetching students:", error);
    return { success: false, error: error.message };
  }
}

export async function approveRegistrationAction(registrationId: string) {
  try {
    // 1. Fetch registration
    const regRef = adminDb.collection('registrations').doc(registrationId);
    const regDoc = await regRef.get();
    if (!regDoc.exists) return { success: false, error: 'Registration not found' };
    
    const regData = regDoc.data();
    if (regData?.status === 'approved') return { success: false, error: 'Already approved' };

    const workshopDays = regData?.workshopDays || 5;
    const masterBatchName = `Master: ${workshopDays}-Day Workshop`;

    // 2. Find or Create Master Batch
    const batchesSnapshot = await adminDb.collection('batches').where('name', '==', masterBatchName).get();
    let batchId = '';
    let emailTemplate = '';

    if (batchesSnapshot.empty) {
      const newBatchRef = adminDb.collection('batches').doc();
      batchId = newBatchRef.id;
      emailTemplate = `Welcome to the ${masterBatchName} Bootcamp!\nYour login credentials are:\nEmail: {{email}}\nPassword: {{password}}\n\nLogin at: https://yourdomain.com/workshops/student\n`;
      await newBatchRef.set({
        name: masterBatchName,
        createdAt: new Date().toISOString(),
        emailTemplate,
        studentCount: 1,
        totalDays: workshopDays,
      });
    } else {
      const batchDoc = batchesSnapshot.docs[0];
      batchId = batchDoc.id;
      emailTemplate = batchDoc.data().emailTemplate;
      
      await adminDb.collection('batches').doc(batchId).update({
        studentCount: (batchDoc.data().studentCount || 0) + 1
      });
    }

    // 3. Create Firebase User
    const cleanEmail = regData?.email.trim();
    const password = generateRandomPassword(8);
    let userRecord;
    
    try {
      userRecord = await adminAuth.getUserByEmail(cleanEmail);
      await adminAuth.updateUser(userRecord.uid, { password });
    } catch(e) {
      userRecord = await adminAuth.createUser({
        email: cleanEmail,
        password: password,
        displayName: regData?.name,
      });
    }

    // 4. Create Student Doc
    await adminDb.collection('students').doc(userRecord.uid).set({
      email: cleanEmail,
      batchId: batchId,
      progress: {
        day: 1,
        state: 'MORNING_VIDEO'
      },
      initialPassword: password,
      name: regData?.name,
      phone: regData?.phone || '',
      createdAt: new Date().toISOString()
    }, { merge: true });

    // 5. Update Registration Status
    await regRef.update({
      status: 'approved',
      updatedAt: new Date().toISOString()
    });

    // 5.5 Push status update to Google Sheets
    try {
      const gasUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
      if (gasUrl) {
        await fetch(gasUrl, {
          method: 'POST',
          // no-cors is important for Google Apps Script Web Apps from browser, but since we are server-side here, 
          // we can just omit it or keep it. Let's send a normal POST since CORS is a browser concept.
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'update_status',
            id: registrationId,
            status: 'approved'
          })
        });
      }
    } catch (err) {
      console.error("Failed to sync status to Google Sheets:", err);
    }

    // 6. Send Email using Nodemailer
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });

      let personalizedContent = emailTemplate
        .replace(/{{email}}/g, cleanEmail)
        .replace(/{{password}}/g, password)
        .replace(/{{name}}/g, regData?.name || 'Student');

      await transporter.sendMail({
        from: `"The Career Breweries" <${gmailUser}>`,
        to: cleanEmail,
        subject: 'Your Workshop Credentials',
        text: personalizedContent,
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error approving registration:", error);
    return { success: false, error: error.message };
  }
}

