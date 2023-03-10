import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { createClient } from "redis";
import { unauthorizedError } from "@/errors";
import { prisma } from "@/config";

const redis = createClient({
  url: process.env.REDIS_URL
});

redis.connect();

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return generateUnauthorizedResponse(res);

  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
  const r = await redis.get(token);
  
  if(r !== "true") {
    console.log(r, token);
    console.log("Não tem no redis");
    try {
      const session = await prisma.session.findFirst({
        where: {
          token,
        },
      });
      if (!session) return generateUnauthorizedResponse(res);
      
      req.userId = userId;
      await redis.set(token, "true");
      //await redis.expire(token, 1800);
      console.log("Guardei no redis");

      //TODO mudar aqui
      return next();
    } catch (err) {
      return generateUnauthorizedResponse(res);
    }
  }
  return next();
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
