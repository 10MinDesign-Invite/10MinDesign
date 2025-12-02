import { NextFunction, Request, Response } from "express";
import { getDerivedEncryptionKey } from "../helpers/generateSecret.js";
import * as jose from "jose"
import { DEV_SALT, NODE_ENV, PROD_SALT } from "../env-config.js";
export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies[NODE_ENV === 'production' ? `${PROD_SALT}` : `${DEV_SALT}`];
    const encryptionKey = await getDerivedEncryptionKey();
    const { plaintext } = await jose.compactDecrypt(token, encryptionKey);
    const decodedPayload = JSON.parse(new TextDecoder().decode(plaintext));
    
    if (!token) {
      res.send("unauthorized user");
      return;
    }

    if (decodedPayload.role === "admin") {
      next();
    }else{
      res.status(401).json({success:false,message:"you not authorized"});
    }
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
}
