import { notFoundError } from "@/errors";
import activitiesRepository from "@/repositories/activities-repository";
import { Days } from "@prisma/client";

async function eventDays(): Promise<Days[]> {
  const eventDays = await activitiesRepository.findEventDays();
  console.log("eventeDays: ", eventDays);
  if (!eventDays) throw notFoundError();

  return eventDays;
}

async function activitiesByDayId(dayId: number): Promise<void> {
  const activities = activitiesRepository.findActivitiesByDayId(dayId);
}

//async function subscribe(userId: number) {
//}

const activitiesService = {
  eventDays,
  activitiesByDayId,
  //subscribe,
};

export default activitiesService;
