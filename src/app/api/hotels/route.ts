import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const hotels = await prisma.hotel.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    if (!hotels) {
      return NextResponse.json({ data: [], error: 'No hotels found' }, { status: 404 });
    }

    return NextResponse.json({ data: hotels });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
} 