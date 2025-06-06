import { PrismaClient, RequestType, RequestStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.request.deleteMany();
  await prisma.hotel.deleteMany();

  // Create hotels first
  const hotels = [
    {
      id: 'hotel-1',
      name: 'Grand Hotel',
    },
    {
      id: 'hotel-2',
      name: 'Seaside Resort',
    },
    {
      id: 'hotel-3',
      name: 'Mountain View Lodge',
    },
  ];

  // Create hotels and store their IDs
  const createdHotels = await Promise.all(
    hotels.map(hotel => 
      prisma.hotel.create({
        data: hotel,
      })
    )
  );

  console.log('Hotels created:', createdHotels);

  // Create test requests
  const requests = [
    {
      hotelId: 'hotel-1',
      guestName: 'John Smith',
      requestType: RequestType.CLEANING,
      status: RequestStatus.PENDING,
      createdAt: new Date('2024-03-15T10:00:00Z'),
    },
    {
      hotelId: 'hotel-1',
      guestName: 'Mary Johnson',
      requestType: RequestType.TOWELS,
      status: RequestStatus.IN_PROGRESS,
      createdAt: new Date('2024-03-15T11:30:00Z'),
    },
    {
      hotelId: 'hotel-2',
      guestName: 'Alex Brown',
      requestType: RequestType.LATE_CHECKOUT,
      status: RequestStatus.DONE,
      createdAt: new Date('2024-03-14T09:15:00Z'),
    },
    {
      hotelId: 'hotel-2',
      guestName: 'Anna Wilson',
      requestType: RequestType.ROOM_SERVICE,
      status: RequestStatus.PENDING,
      createdAt: new Date('2024-03-15T14:20:00Z'),
    },
    {
      hotelId: 'hotel-3',
      guestName: 'Peter Davis',
      requestType: RequestType.MAINTENANCE,
      status: RequestStatus.IN_PROGRESS,
      createdAt: new Date('2024-03-14T16:45:00Z'),
    },
    {
      hotelId: 'hotel-3',
      guestName: 'Helen Miller',
      requestType: RequestType.OTHER,
      status: RequestStatus.PENDING,
      createdAt: new Date('2024-03-15T08:30:00Z'),
    },
  ];

  // Create requests
  const createdRequests = await Promise.all(
    requests.map(request =>
      prisma.request.create({
        data: request,
      })
    )
  );

  console.log('Requests created:', createdRequests);
  console.log('Database has been successfully seeded with test data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 