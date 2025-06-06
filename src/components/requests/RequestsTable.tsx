import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE";
type RequestType = "CLEANING" | "TOWELS" | "LATE_CHECKOUT" | "ROOM_SERVICE" | "MAINTENANCE" | "OTHER";
type Request = {
  id: string;
  guestName: string;
  requestType: RequestType;
  status: RequestStatus;
  createdAt: string;
};

type RequestsTableProps = {
  requests: Request[];
  onStatusChange: (requestId: string, newStatus: RequestStatus) => Promise<void>;
};

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
};

const statusLabels = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

const requestTypeLabels: Record<RequestType, string> = {
  CLEANING: 'Cleaning',
  TOWELS: 'Towels',
  LATE_CHECKOUT: 'Late Check-out',
  ROOM_SERVICE: 'Room Service',
  MAINTENANCE: 'Maintenance',
  OTHER: 'Other',
};

const statusFlow: Record<RequestStatus, RequestStatus> = {
  PENDING: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE: 'PENDING',
};

export function RequestsTable({ requests, onStatusChange }: RequestsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState<'date' | '-date' | ''>(() => {
    const sort = searchParams.get('sort');
    return (sort === 'date' || sort === '-date' || sort === '') ? sort : '';
  });

  const handleSort = () => {
    let newOrder: 'date' | '-date' | '';
    switch (sortOrder) {
      case '':
        newOrder = 'date';
        break;
      case 'date':
        newOrder = '-date';
        break;
      case '-date':
        newOrder = '';
        break;
      default:
        newOrder = '';
    }
    
    setSortOrder(newOrder);
    const params = new URLSearchParams(searchParams.toString());
    if (newOrder) {
      params.set('sort', newOrder);
    } else {
      params.delete('sort');
    }
    router.push(`?${params.toString()}`);
  };

  const sortedRequests = [...(requests || [])].sort((a, b) => {
    if (!sortOrder) return 0;
    
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'date' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guest Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Request Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                onClick={handleSort}
                className="flex items-center space-x-1 hover:text-gray-700"
              >
                <span>Created At</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    sortOrder === 'date' 
                      ? 'rotate-180' 
                      : sortOrder === '-date' 
                        ? 'rotate-0' 
                        : 'opacity-50'
                  }`} 
                />
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedRequests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {request.guestName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {requestTypeLabels[request.requestType]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[request.status]}`}>
                  {statusLabels[request.status]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(request.createdAt), 'PPp')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => onStatusChange(request.id, statusFlow[request.status])}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Next Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 