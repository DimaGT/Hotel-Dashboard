import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    // Очищаємо таблицю перед заповненням
    await prisma.request.deleteMany();
    // Створюємо тестові запити
    const requests = [
        {
            hotelId: '1234-uuid',
            guestName: 'John Doe',
            requestType: 'CLEANING',
            status: 'PENDING',
            createdAt: new Date('2024-06-01T10:00:00Z'),
        },
        {
            hotelId: '1234-uuid',
            guestName: 'Jane Smith',
            requestType: 'TOWELS',
            status: 'IN_PROGRESS',
            createdAt: new Date('2024-06-02T11:30:00Z'),
        },
        {
            hotelId: '1234-uuid',
            guestName: 'Bob Johnson',
            requestType: 'LATE_CHECKOUT',
            status: 'DONE',
            createdAt: new Date('2024-06-03T09:15:00Z'),
        },
        {
            hotelId: '1234-uuid',
            guestName: 'Alice Brown',
            requestType: 'ROOM_SERVICE',
            status: 'PENDING',
            createdAt: new Date('2024-06-04T14:20:00Z'),
        },
        {
            hotelId: '1234-uuid',
            guestName: 'Charlie Wilson',
            requestType: 'MAINTENANCE',
            status: 'IN_PROGRESS',
            createdAt: new Date('2024-06-05T16:45:00Z'),
        },
    ];
    for (const request of requests) {
        await prisma.request.create({
            data: request,
        });
    }
    console.log('Базу даних заповнено тестовими даними!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
