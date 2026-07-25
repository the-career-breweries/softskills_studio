import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const program = searchParams.get('program')?.toLowerCase();
  const stream = searchParams.get('stream')?.toLowerCase();
  const semester = searchParams.get('semester');
  const week = searchParams.get('week');

  if (!program || !stream || !semester || !week) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    // If week is 0, serve the special orientation presentation
    if (week === '0' || week === 'orientation') {
      const filePath = path.join(process.cwd(), 'src', 'content', 'orientation.md');
      const fileContents = await fs.readFile(filePath, 'utf8');
      return NextResponse.json({ content: fileContents });
    }

    // Determine the path to the markdown file
    // Example: src/content/lessons/ug/bcom/sem1/week1.md
    
    // Using string replacement to clean up stream names like "B.Com" to "bcom"
    let safeStream = stream.replace(/[^a-z0-9]/g, '');
    
    // Route all UG students in Semesters 1 to 4 to the shared content directory
    if (program === 'ug' && parseInt(semester) >= 1 && parseInt(semester) <= 4) {
      safeStream = 'shared';
    }
    
    const filePath = path.join(
      process.cwd(),
      'src',
      'content',
      'lessons',
      program,
      safeStream,
      `sem${semester}`,
      `week${week}.md`
    );

    const fileContents = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ content: fileContents });
  } catch (error) {
    console.error('Failed to read markdown file:', error);
    return NextResponse.json(
      { error: 'Lesson content not found. Create a markdown file for this week to see it here!' },
      { status: 404 }
    );
  }
}
