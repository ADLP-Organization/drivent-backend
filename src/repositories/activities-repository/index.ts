import { prisma } from "@/config";

async function findEventDays() {
  return prisma.days.findMany();
}

async function findActivitiesByDayId(dayId: number) {
  return prisma.activities.findMany({
    where: {
      dayId
    }
  });
}

/* async function subscribe() {
  return prisma.subscription.upsert({
  });
} */

const activitiesRepository = {
  findEventDays,
  findActivitiesByDayId,
  /* subscribe, */
};

export default activitiesRepository;
