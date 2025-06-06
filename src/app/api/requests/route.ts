import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { RequestType } from '@/types';
import { RequestStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get('hotel_id');
  const status = searchParams.get('status');
  const sort = searchParams.get('sort');

  if (!hotelId) {
    return NextResponse.json({ data: [], error: 'Hotel ID is required' }, { status: 400 });
  }

  try {
    const where = {
      hotelId,
      ...(status && status !== 'ALL' ? { status: status as RequestStatus } : {}),
    };

    const orderBy = sort === 'date' 
      ? { createdAt: 'desc' as const }
      : sort === '-date'
        ? { createdAt: 'asc' as const }
        : undefined;

    const requests = await prisma.request.findMany({
      where,
      orderBy,
      include: {
        hotel: true,
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