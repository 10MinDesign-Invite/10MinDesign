import { NextFunction, Request, Response } from "express";

export async function capchaMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { capchaToken } = req.body;
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                response:capchaToken,
                secret:process.env.CLOUD_FLAIR_SECRETKEY
            }),
        });
    
        const result = await response.json();
        if(result.success){
            next();
        }else{
            res.json({ success: false, message: "don`t spam" });
        }
    } catch (error) {
        console.log(error)
    }
}