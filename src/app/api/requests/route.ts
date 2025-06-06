import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "ALL";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hotelId = searchParams.get('hotel_id');
  const status = searchParams.get('status') as RequestStatus | null;
  const sort = searchParams.get('sort');

  if (!hotelId) {
    return NextResponse.json({ data: [], error: 'Hotel ID is required' }, { status: 400 });
  }

  try {
    const where = {
      hotelId,
      ...(status && status !== 'ALL' ? { status } : {}),
    };

    const orderBy = sort === 'date' 
      ? { createdAt: 'desc' as const }
      : sort === '-date'
        ? { createdAt: 'asc' as const }
        : undefined;

    const requests = await prisma.request.findMany({
      where,
      orderBy,
      select: {
        id: true,
        hotelId: true,
        guestName: true,
        requestType: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: requests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json({ data: [], error: 'Internal Server Error' }, { status: 500 });
  }
} 