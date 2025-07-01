import { getToken } from "@auth/core/jwt";
import { NextFunction, Request, Response } from "express";

export async function AuthMiddleware(req: Request, res: Response, next:NextFunction) {
  try {
    const token = await getToken({
      req: {
        headers: req.headers as Record<string, string> || req.cookies['__Secure-authjs.session-token'],
      },
      secret: process.env.AUTH_SECRET!,
    });
    
    
    console.log(token,"from base")
    if(!token?.email || token){
        res.send("unauthorized user")   
        return
    }
     
    next();
    
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
}