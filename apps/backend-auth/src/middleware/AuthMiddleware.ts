import { NextFunction, Request, Response } from "express";
import { getDerivedEncryptionKey } from "../helpers/generateSecret";
import jose from "jose"
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies[process.env.NODE_ENV === 'production' ? `${process.env.PROD_SALT}` : `${process.env.DEV_SALT}`];
    const encryptionKey = await getDerivedEncryptionKey();
    const { plaintext } = await jose.compactDecrypt(token, encryptionKey);
    const decodedPayload = JSON.parse(new TextDecoder().decode(plaintext));    
    if (!token) {
      res.send("unauthorized user");
      return;
    }

    if (decodedPayload.role === "user") {
      next();
    }else{
      res.status(401).json({success:false,message:"you not authorized"});
    }
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
}
