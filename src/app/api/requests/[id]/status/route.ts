import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RequestStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    const updatedRequest = await prisma.request.update({
      where: {
        id: params.id,
      },
      data: {
        status: status as RequestStatus,
      },
      include: {
        hotel: true,
      },
    });

    return NextResponse.json({ data: updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    return NextResponse.json(
      { error: 'Failed to update request status' },
      { status: 500 }
    );
  }
} 