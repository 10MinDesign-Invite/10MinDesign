import { decode} from "@auth/core/jwt";
import { NextFunction, Request, Response } from "express";

export async function AuthMiddleware(req: Request, res: Response, next:NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = await decode({
      token:token,
      salt: `${process.env.NODE_ENV === "development" ? process.env.DEV_SALT : process.env.PROD_SALT}`,
      secret: process.env.AUTH_SECRET!
    });
    if(!token){
        res.send("unauthorized user")   
        return
    }
     
    next();
    
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
}