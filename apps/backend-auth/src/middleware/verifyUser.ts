import { auth, fromNodeHeaders } from "@repo/auth/auth";
import type { NextFunction, Request, Response } from "express";

export async function verifyUser(req:Request, res:Response, next:NextFunction) {
  const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
  if (session?.user.role !== "admin") {
     res.status(401).json({ message: "Unauthorized" });
  } else {
    req.id = session.user.id.toString();
    req.email = session.user.email;
    req.emailVarified = session.user.emailVerified;
    req.username = session.user.name;
    req.role = session.user.role;
    next();
  }
}