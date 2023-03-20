import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  await prisma.ticketType.createMany({
    skipDuplicates: true,
    data: [{
        name: 'Online',
        price: 150,
        isRemote: true,
        includesHotel: false
      },
      {
        name: 'Presencial sem Hotel',
        price: 250,
        isRemote: false,
        includesHotel: false
      },
      {
        name: 'Presencial com Hotel',
        price: 600,
        isRemote: false,
        includesHotel: true
      },      
    ]
  });

  await prisma.hotel.createMany({
    skipDuplicates: true,
    data: [{
        name: 'H Hotel',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/4e/3b/4d/standard-twin-room--v16876947.jpg?w=300&h=300&s=1'
      },
      {
        name: 'Village Inn',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/19/a6/f1/eurostars-oporto.jpg?w=300&h=300&s=1'  
      },
      {
        name: 'Solar Plaza',
        image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/24/6a/e7/4e/eurostars-porto-douro.jpg' 
      }
    ]
  });

  await prisma.room.createMany({
    skipDuplicates: true,
    data: [
      { name: '101', capacity: 1, hotelId: 1 },
      { name: '102', capacity: 1, hotelId: 1 },
      { name: '103', capacity: 1, hotelId: 1 },
      { name: '104', capacity: 3, hotelId: 1 },
      { name: '201', capacity: 3, hotelId: 1 },
      { name: '202', capacity: 2, hotelId: 1 },
      { name: '203', capacity: 2, hotelId: 1 },
      { name: '204', capacity: 2, hotelId: 1 },
      { name: '301', capacity: 2, hotelId: 1 },
      { name: '302', capacity: 2, hotelId: 1 },
      { name: '303', capacity: 2, hotelId: 1 },
      { name: '304', capacity: 2, hotelId: 1 },
      { name: '401', capacity: 2, hotelId: 1 },
      { name: '402', capacity: 2, hotelId: 1 },
      { name: '403', capacity: 2, hotelId: 1 },
      { name: '404', capacity: 2, hotelId: 1 },
      { name: '101', capacity: 1, hotelId: 2 },
      { name: '102', capacity: 1, hotelId: 2 },
      { name: '103', capacity: 1, hotelId: 2 },
      { name: '104', capacity: 1, hotelId: 2 },
      { name: '201', capacity: 2, hotelId: 2 },
      { name: '202', capacity: 2, hotelId: 2 },
      { name: '203', capacity: 2, hotelId: 2 },
      { name: '204', capacity: 2, hotelId: 2 },
      { name: '301', capacity: 2, hotelId: 2 },
      { name: '302', capacity: 2, hotelId: 2 },
      { name: '303', capacity: 2, hotelId: 2 },
      { name: '304', capacity: 2, hotelId: 2 },
      { name: '401', capacity: 2, hotelId: 2 },
      { name: '402', capacity: 2, hotelId: 2 },
      { name: '403', capacity: 2, hotelId: 2 },
      { name: '404', capacity: 2, hotelId: 2 },   
      { name: '101', capacity: 1, hotelId: 3 },
      { name: '102', capacity: 1, hotelId: 3 },
      { name: '103', capacity: 1, hotelId: 3 },
      { name: '104', capacity: 2, hotelId: 3 },
      { name: '201', capacity: 2, hotelId: 3 },
      { name: '202', capacity: 2, hotelId: 3 },
      { name: '203', capacity: 2, hotelId: 3 },
      { name: '204', capacity: 2, hotelId: 3 },
      { name: '301', capacity: 2, hotelId: 3 },
      { name: '302', capacity: 2, hotelId: 3 },
      { name: '303', capacity: 3, hotelId: 3 },
      { name: '304', capacity: 3, hotelId: 3 },       
    ]
  });

  await prisma.days.createMany({
    skipDuplicates: true,
    data: [
      { eventId: 1, date: dayjs('2023-05-07').toDate()},
      { eventId: 1, date: dayjs('2023-05-08').toDate()},
      { eventId: 1, date: dayjs('2023-05-09').toDate()},
    ]
  });

  await prisma.locals.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Auditório Principal' },
      { name: 'Auditório Lateral' },
      { name: 'Sala de Workshop' },
    ]
  });

  await prisma.activities.createMany({
    skipDuplicates: true,
    data: [
      { dayId: 1, localId: 1, hourStart: 9, hourEnd: 11, capacity: 150, name: 'Palestra de Abertura' },
      { dayId: 1, localId: 1, hourStart: 14, hourEnd: 17, capacity: 150, name: 'Mesa Redonda TypeScript'},
      { dayId: 1, localId: 2, hourStart: 9, hourEnd: 10, capacity: 50, name: 'Minicurso Lógica de programação' },
      { dayId: 1, localId: 2, hourStart: 10, hourEnd: 11, capacity: 50, name: 'Minicurso Banco de Dados' },
      { dayId: 1, localId: 3, hourStart: 9, hourEnd: 12, capacity: 20, name: 'Minicurso Infraestrutura' },
      { dayId: 1, localId: 3, hourStart: 14, hourEnd: 16, capacity: 20, name: 'Palestra Desenvolvimento de Games' },
      { dayId: 2, localId: 1, hourStart: 9, hourEnd: 12, capacity: 150, name: 'Palestra Desenvolvimento Mobile' },
      { dayId: 2, localId: 1, hourStart: 14, hourEnd: 17, capacity: 150, name: 'Mesa Redonda Testes' },
      { dayId: 2, localId: 2, hourStart: 10, hourEnd: 12, capacity: 50, name: 'Minicurso JavaScript' },
      { dayId: 2, localId: 3, hourStart: 9, hourEnd: 12, capacity: 20, name: 'Minicurso HTML e CSS' },
      { dayId: 2, localId: 3, hourStart: 14, hourEnd: 17, capacity: 20, name: 'Minicurso Java'},
      { dayId: 3, localId: 1, hourStart: 9, hourEnd: 12, capacity: 150, name: 'Mesa Redonda React' },
      { dayId: 3, localId: 1, hourStart: 14, hourEnd: 16, capacity: 150, name: 'Palestra de Encerramento' },
      { dayId: 3, localId: 2, hourStart: 9, hourEnd: 12, capacity: 50, name: 'Mesa Redonda Metodologias Ágeis' },
      { dayId: 3, localId: 3, hourStart: 9, hourEnd: 11, capacity: 20, name: 'Minicurso Soft Skills' },
      { dayId: 3, localId: 3, hourStart: 14, hourEnd: 16, capacity: 20, name: 'Minicurso Go'},
    ]
  });

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
