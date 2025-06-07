import { prisma } from "@repo/database";
import { verifyuser } from "@repo/zod-input-validation";
import Router, { Request, Response } from "express"

export const findUser = Router();

findUser.post("/user",async (req:Request,res:Response)=>{
   try {
     const email = req.body.email as string
     const parseData = verifyuser.safeParse({email});
     if(!parseData.success){
         res.send("email format not valid");
         return
     }
     const user = await prisma.user.findUnique({
            where:{
              email
            }
     });
     if(!user){
         res.status(404).send("user not found");
     }
     res.status(200).send(user);
   } catch (error) {
    console.log(error);
   }
})