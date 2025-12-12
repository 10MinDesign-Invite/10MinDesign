import { Redis } from "@upstash/redis";
import { REDIS_TOKEN, REDIS_URL } from "../env-config.js";

export const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

// await redis.set("foo", "bar");
// await redis.get("foo");
