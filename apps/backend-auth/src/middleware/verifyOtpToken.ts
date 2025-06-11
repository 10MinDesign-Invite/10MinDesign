import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
export function verifyOtpToken(req:Request,res:Response,next:NextFunction){
    try {
        const token = req.body.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized verify first then try" });
            return
        }
        const validToken = jwt.verify(token, process.env.jwt_OTP_SECRET!) as JwtPayload;
        if (!validToken) {
            res.status(401).json({ message: "unothorized person to forgot password" });
            return 
        }
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "internal server error" });
    }
}