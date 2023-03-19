import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import httpStatus from "http-status";
import { Days } from "@prisma/client";

export async function getEventDays(req: AuthenticatedRequest, res: Response) {
  try {
    const days: Days[] = await activitiesService.eventDays();
    console.log("days: ", days);
    return res.status(httpStatus.OK).send( days );
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getDayWithActivities(req: AuthenticatedRequest, res: Response) {
  const { dayId } = req.params;
  try {
    const activities = await activitiesService.activitiesByDayId(Number(dayId));
    return res.status(httpStatus.OK).send( activities );
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postSubscribe(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId, hourStart, hourEnd } = req.body;
  try {
    const userActivityByActivityId = await activitiesService.userActivityByActivityId(userId, activityId);
    const userActivities = await activitiesService.userActivities(userId);

    if(userActivities.length !== 0) {
      userActivities.map((activity) => {
        //console.log(activity.Activities);
      });
    }

    if(userActivityByActivityId) {
      await activitiesService.deleteSubscribe(userActivityByActivityId[0].id);
      return res.send("Canceled activity subscription").status(200);
    }else{
      await activitiesService.subscribe(userId, activityId);
      return res.send("Enrollment in the activity done successfully").status(201);
    }
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
