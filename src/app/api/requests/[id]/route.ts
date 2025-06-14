import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const requestData = await prisma.request.findUnique({
      where: { id },
    });

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ data: requestData });
  } catch (error) {
    console.error('Error fetching request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const { id } = params;

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ data: updatedRequest });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 