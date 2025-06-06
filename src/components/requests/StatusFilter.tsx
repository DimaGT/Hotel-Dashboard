'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "ALL";

interface StatusFilterProps {
  currentStatus: string;
}

export function StatusFilter({ currentStatus }: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleStatusChange = (status: RequestStatus) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', status);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Status:</label>
      <div className="flex gap-2">
        <button
          onClick={() => handleStatusChange('ALL')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentStatus === 'ALL'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleStatusChange('PENDING')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentStatus === 'PENDING'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange('IN_PROGRESS')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentStatus === 'IN_PROGRESS'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusChange('DONE')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentStatus === 'DONE'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
} 