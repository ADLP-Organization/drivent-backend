import activitiesRepository from "@/repositories/activities-repository";

async function eventDays(userId: number) {
}

async function activitiesByDayId(dayId: number) {
  const activities = activitiesRepository.findActivitiesByDayId(dayId);
}

async function subscribe(userId: number) {
}

const activitiesService = {
  eventDays,
  activitiesByDayId,
  subscribe,
};

export default activitiesService;