import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import httpStatus from "http-status";
import { Days } from "@prisma/client";
import { conflictError } from "@/errors";
import { NotFoundError } from "@/protocols";

export async function getEventDays(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const days: Days[] = await activitiesService.eventDays(Number(userId));
    
    return res.status(httpStatus.OK).send( days );
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
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

export async function getUserActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const userActivities = await activitiesService.userActivities(userId);
    return res.status(httpStatus.OK).send( userActivities );
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postSubscribe(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId, hourStart, hourEnd } = req.body;
  
  try {
    const userActivityByActivityId = await activitiesService.userActivityByActivityId(userId, activityId);    

    if(userActivityByActivityId) {
      await activitiesService.deleteSubscribe(userActivityByActivityId[0].id);
      return res.send("Canceled activity subscription").status(200);
    }else{
      const userActivities = await activitiesService.userActivities(userId);

      if(userActivities.length !== 0) {
        userActivities.map((activity) => {
          if(activity.Activities.hourStart === hourStart || 
            (activity.Activities.hourStart >= hourStart && activity.Activities.hourStart < hourEnd) 
          ) {
            throw conflictError("Choose activities that take place at different times");
          }
        });
      }
      await activitiesService.subscribe(userId, activityId);
      return res.send("Enrollment in the activity done successfully").status(201);
    }
  } catch (error) {
    if(error.name === "ConflictError") {
      return res.send("Choose activities that take place at different times").status(httpStatus.CONFLICT);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
