import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: { subtasks: true, attachments: true, project: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const task = await prisma.task.create({ data: body });
  return NextResponse.json(task);
}
