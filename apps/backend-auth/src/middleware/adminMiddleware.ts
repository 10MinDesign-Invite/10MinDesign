import { redis } from "@repo/redis";
import { NextFunction, Request, Response } from "express";
import { adminMiddlewareType } from "../types/custome-types";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { sessionId } = req.cookies;
    const { role } = (await redis.get(
      `sessionId:${sessionId}`,
    )) as adminMiddlewareType;
    if (role === "admin") {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
