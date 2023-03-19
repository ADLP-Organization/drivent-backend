import { createClient } from "@redis/client";

export const redis = createClient( {
  url: process.env.REDIS_URL
});

redis.connect();

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}

