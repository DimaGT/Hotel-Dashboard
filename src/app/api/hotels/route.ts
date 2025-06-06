import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET() {
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

    return NextResponse.json({ data: hotels });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { data: [], error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
} 