import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const { id } = params;

    // Validate status
    if (!['PENDING', 'IN_PROGRESS', 'DONE'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        hotelId: true,
        guestName: true,
        requestType: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 