import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import httpStatus from "http-status";

export async function getEventDays(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  // try {
    
  // } catch (error) {

  //   return res.sendStatus(httpStatus.BAD_REQUEST);
  // }
}

export async function getDayWithActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { dayId } = req.params;

  // try {
    
  // } catch (error) {
   
  //   return res.sendStatus(httpStatus.BAD_REQUEST);
  // }
}

export async function postSubscribe(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  // try {
    
  // } catch (error) {
   
  //   return res.sendStatus(httpStatus.BAD_REQUEST);
  // }
}
