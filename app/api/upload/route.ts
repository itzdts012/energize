import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadToDrive } from '@/lib/drive';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const taskId = formData.get('taskId') as string | null;
  const eventId = formData.get('eventId') as string | null;

  // Upload to Google Drive
  const driveFile = await uploadToDrive(file, file.name);

  // Save metadata
  const attachment = await prisma.attachment.create({
    data: {
      name: file.name,
      driveFileId: driveFile.id!,
      mimeType: file.type,
      size: file.size,
      taskId,
      eventId,
    },
  });

  return NextResponse.json(attachment);
}
