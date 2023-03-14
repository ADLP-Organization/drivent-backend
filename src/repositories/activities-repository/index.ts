import { prisma } from "@/config";

async function findEventDays() {
  return prisma.days.findMany({
  });
}

async function findActivitiesByDayId() {
  return prisma.activities.findFirst({
  });
}

async function subscribe() {
  return prisma.subscription.upsert({
  });
}

const activitiesRepository = {
  findEventDays,
  findActivitiesByDayId,
  subscribe,
};

export default activitiesRepository;
