import { prisma } from "@/config";
import { Days } from "@prisma/client";

import dayjs from "dayjs";

export async function createDay(eventeId: number): Promise<Days> {
  const day = {
    eventId: eventeId,
    date: dayjs().add(5, "days").toDate(),
  };
  return  prisma.days.create({
    data: day,
  });
}
