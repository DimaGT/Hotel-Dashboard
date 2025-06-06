'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Hotel = {
  id: string;
  name: string;
};

interface HotelSelectProps {
  hotels: Hotel[];
}

export function HotelSelect({ hotels }: HotelSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentHotelId = searchParams.get('hotel_id') || 'hotel-1';

  const handleHotelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newHotelId = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('hotel_id', newHotelId);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="hotel-select" className="text-sm font-medium text-white">
        Hotel:
      </label>
      <select
        id="hotel-select"
        value={currentHotelId}
        onChange={handleHotelChange}
        className="block w-48 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name}
          </option>
        ))}
      </select>
    </div>
  );
} 