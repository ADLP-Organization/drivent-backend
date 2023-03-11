import { prisma } from "@/config";

async function findAllByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    }
  });
}

async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

async function findTypes() {
  return prisma.room.groupBy({
    by: ["hotelId", "capacity"],
    _count: {
      capacity: true,
    },
  });
}

async function countCapacity() {
  return prisma.room.groupBy({
    by: ["hotelId"],
    _sum: {
      capacity: true,
    },
  });
}

const roomRepository = {
  findAllByHotelId,
  findById,
  findTypes,
  countCapacity
};

export default roomRepository;
