import activitiesRepository from "@/repositories/activities-repository";

async function eventDays(userId: number) {
}

async function activitiesByDayId(dayId: number) {
  const activities = activitiesRepository.findActivitiesByDayId(dayId);
  return activities;
}

async function userActivityByActivityId(userId: number, activityId: number) {
  const activities = await activitiesRepository.findUserActivityByActivityId(userId, activityId);
  if(activities.length === 0) return false;
  return activities;
}

async function userActivities(userId: number) {
  const activities = await activitiesRepository.findUserActivitiesByUserId(userId);
  return activities;
}

async function subscribe(userId: number, activityId: number) {
  const newSubscribe = await activitiesRepository.subscribe(userId, activityId);
  const newCapacity = newSubscribe.Activities.capacity - 1;
  await updateActivityCapacity(newSubscribe.Activities.id, newCapacity);
  return newSubscribe;
}

async function deleteSubscribe(subscriptionId: number) {
  const delSubscribe = await activitiesRepository.deleteSubscribe(subscriptionId);
  const newCapacity = delSubscribe.Activities.capacity + 1;
  await updateActivityCapacity(delSubscribe.Activities.id, newCapacity);
  return delSubscribe;
}

async function updateActivityCapacity(activityId: number, newCapacity: number) {
  await activitiesRepository.updateActivityCapacity(activityId, newCapacity);
}

const activitiesService = {
  eventDays,
  activitiesByDayId,
  userActivityByActivityId,
  userActivities,
  subscribe,
  deleteSubscribe,
};

export default activitiesService;
