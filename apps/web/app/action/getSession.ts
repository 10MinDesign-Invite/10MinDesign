import { redis } from "@repo/redis";
import { cookies, headers } from "next/headers";
import { AuthData } from "../types/custome-types";
import { auth } from "@repo/database/auth";

export async function getSession(): Promise<AuthData | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) return null;
  const authData = (await redis.get(
    `sessionId:${sessionId}`,
  )) as AuthData | null;
  return authData;
}

