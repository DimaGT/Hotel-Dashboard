import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET() {
  console.log('GET /api/hotels - Starting request');
  
  try {
    console.log('GET /api/hotels - Fetching hotels from database');
    const hotels = await prisma.hotel.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    console.log(`GET /api/hotels - Found ${hotels.length} hotels`);
    return NextResponse.json({ data: hotels });
  } catch (error) {
    console.error('GET /api/hotels - Error:', error);
    return NextResponse.json(
      { 
        data: [], 
        error: 'Failed to fetch hotels',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 