import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { approveRegistrationAction } from '@/app/actions/adminOps';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validate payload
    if (!data.id || !data.status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    if (data.status === 'approved') {
      // Execute the full approval workflow (creates auth, master batch, sends email)
      const res = await approveRegistrationAction(data.id);
      if (!res.success) {
        console.error("Webhook approval failed:", res.error);
        return NextResponse.json({ error: res.error }, { status: 500 });
      }
      console.log(`Successfully synced status '${data.status}' AND enrolled student ${data.id}`);
    } else {
      // Just update status (e.g. rejected)
      const adminDb = getAdminDb();
      const docRef = adminDb.collection('registrations').doc(data.id);
      await docRef.update({
        status: data.status,
        updatedAt: new Date()
      });
      console.log(`Successfully synced status '${data.status}' for registration ${data.id} from Google Sheets`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
