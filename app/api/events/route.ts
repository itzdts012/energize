import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const body = await request.json();
  const { id } = await context.params;
  
  const event = await prisma.event.update({
    where: { id },
    data: body,
  });
  
  return NextResponse.json(event);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  
  await prisma.event.delete({
    where: { id }
  });
  
  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  
  const event = await prisma.event.findUnique({
    where: { id },
    include: { attachments: true }
  });
  
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  
  return NextResponse.json(event);
}
