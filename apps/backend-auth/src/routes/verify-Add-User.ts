import { prisma } from "@repo/database";
import { verifyuser } from "@repo/zod-input-validation";
import { Request, Response, Router } from "express";


export const verify_Add_User = Router();

verify_Add_User.post("/user",async (req:Request,res:Response)=>{
    const email = req.body.email;
    const onlyEmail = req.body.onlyEmail
    const parseData = verifyuser.safeParse({email});
    if(!parseData.success){
        res.send("email format not correct");
        return
    } 
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        res.status(404).send("user not found");
        return
    }
    if(onlyEmail == "select only email"){
        res.status(200).send(user.email)
    }else{
        res.status(200).send(user);
    }
})