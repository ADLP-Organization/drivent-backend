import { prisma } from "@/config";

async function findEventDays() {
  return prisma.days.findMany();
}

async function findActivitiesByDayId(dayId: number) {
  return prisma.activities.findMany({
    where: {
      dayId
    },
    orderBy: {
      id: "asc"
    }
  });
}

async function findUserActivityByActivityId(userId: number, activityId: number) {
  return prisma.subscription.findMany({
    where: {
      userId,
      activityId
    }
  });
}

async function findUserActivitiesByUserId(userId: number) {
  return prisma.subscription.findMany({
    where: {
      userId,
    },
    include: {
      Activities: true
    }
  });
}

async function subscribe(userId: number, activityId: number) {
  const data = {
    userId,
    activityId
  };
  return prisma.subscription.create({
    data,
    include: {
      Activities: true
    }
  });
} 

async function deleteSubscribe(subscriptionId: number) {
  return prisma.subscription.delete({
    where: {
      id: subscriptionId
    },
    include: {
      Activities: true
    }
  });
} 

async function updateActivityCapacity(activityId: number, newCapacity: number) {
  return prisma.activities.update({
    where: {
      id: activityId
    },
    data: {
      capacity: newCapacity
    }
  });
}

const activitiesRepository = {
  findEventDays,
  findActivitiesByDayId,
  findUserActivityByActivityId,
  findUserActivitiesByUserId,
  subscribe,
  deleteSubscribe,
  updateActivityCapacity,
};

export default activitiesRepository;
