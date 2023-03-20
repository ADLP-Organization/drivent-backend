import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getEventDays, getDayWithActivities, postSubscribe, getUserActivities } from "@/controllers";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/days", getEventDays)
  .get("/days/:dayId", getDayWithActivities)
  .get("/userActivities", getUserActivities)
  .post("/", postSubscribe);

export { activitiesRouter };
