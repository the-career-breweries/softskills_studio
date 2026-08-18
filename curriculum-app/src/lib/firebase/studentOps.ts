import { db } from './config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export type WorkState = 'MORNING_VIDEO' | 'DEEP_WORK_1' | 'BREAK' | 'DEEP_WORK_2' | 'RECAP_VIDEO' | 'SUBMISSION';

export interface StudentProgress {
  day: number;
  state: WorkState;
  breakStartTime?: string; // ISO string to track break progress if they refresh
}

export async function getStudentProgress(uid: string) {
  try {
    const docRef = doc(db, 'students', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().progress as StudentProgress;
    }
    return null;
  } catch (error) {
    console.error("Error fetching student progress:", error);
    return null;
  }
}

export async function updateStudentProgress(uid: string, progressUpdates: Partial<StudentProgress>) {
  try {
    const docRef = doc(db, 'students', uid);
    // Only update the nested progress object
    // Since we don't want to overwrite the whole object, we use dot notation in updateDoc
    const updates: Record<string, any> = {};
    for (const [key, value] of Object.entries(progressUpdates)) {
      updates[`progress.${key}`] = value;
    }
    await updateDoc(docRef, updates);
    return true;
  } catch (error) {
    console.error("Error updating student progress:", error);
    return false;
  }
}
