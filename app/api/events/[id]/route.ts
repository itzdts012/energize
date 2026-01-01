import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const event = await prisma.event.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(event);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.event.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
