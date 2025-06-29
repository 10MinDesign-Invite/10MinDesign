import { getToken } from "@auth/core/jwt";
import { NextFunction, Request, Response } from "express";

export async function AuthMiddleware(req: Request, res: Response, next:NextFunction) {
  try {
    const token = await getToken({
      req: {
        headers: req.headers as Record<string, string>,
      },
      secret: process.env.AUTH_SECRET!,
    });
    if(!token?.email){
        res.send("unauthorized user")   
        return
    }
     
    next();
    
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
}