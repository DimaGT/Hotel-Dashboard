'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RequestsTable } from '@/components/requests/RequestsTable';
import { StatusFilter } from '@/components/requests/StatusFilter';
import { HotelSelect } from '@/components/requests/HotelSelect';

type RequestType = "CLEANING" | "TOWELS" | "LATE_CHECKOUT" | "ROOM_SERVICE" | "MAINTENANCE" | "OTHER";

type Request = {
  id: string;
  guestName: string;
  requestType: RequestType;
  status: RequestStatus;
  createdAt: string;
};

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE";

type Hotel = {
  id: string;
  name: string;
};

type ApiResponse<T> = {
  data: T[];
  error?: string;
};

function RequestsContent() {
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<Request[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const hotelId = searchParams.get('hotel_id') || 'hotel-1';
  const status = searchParams.get('status') || 'ALL';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/api/hotels');
        const result: ApiResponse<Hotel> = await response.json();
        setHotels(result.data || []);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setHotels([]);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`/api/requests?hotel_id=${hotelId}&status=${status}&sort=${sort}`);
        const result: ApiResponse<Request> = await response.json();
        setRequests(result.data || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setRequests([]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchRequests();
  }, [hotelId, status, sort]);

  const handleStatusChange = async (requestId: string, newStatus: RequestStatus) => {
    try {
      const response = await fetch(`/api/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, status: newStatus } : request
          )
        );
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full bg-indigo-600 py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Guest Requests Dashboard</h1>
          <div className="flex items-center gap-4">
            <HotelSelect hotels={hotels} />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start py-8">
        <div className="w-full max-w-4xl">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <StatusFilter currentStatus={status} />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            {requests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No data available</p>
                <p className="text-sm mt-2">Try adjusting your filter settings</p>
              </div>
            ) : (
              <RequestsTable requests={requests} onStatusChange={handleStatusChange} />
            )}
          </div>
        </div>
      </main>
      <footer className="w-full bg-gray-100 py-4 mt-8 border-t text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Guest Requests SaaS. Powered by Next.js & Prisma.
      </footer>
    </div>
  );
}

export default function RequestsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <RequestsContent />
    </Suspense>
  );
} 