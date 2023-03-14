import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getEventDays, getDayWithActivities, postSubscribe } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getEventDays)
  .get("/days/:dayId", getDayWithActivities)
  .post("/", postSubscribe);

export { activitiesRouter };
