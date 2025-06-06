import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RequestType } from '@/types';
import { RequestStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET() {
  try {
    const requests = await prisma.request.findMany({
      include: {
        hotel: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ data: requests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, hotelId, guestName, comment } = body;

    const requestData = await prisma.request.create({
      data: {
        requestType: type as RequestType,
        status: RequestStatus.PENDING,
        hotelId,
        guestName,
      },
      include: {
        hotel: true,
      },
    });

    return NextResponse.json({ data: requestData });
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    );
  }
} 