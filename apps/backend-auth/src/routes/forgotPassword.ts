import { Request, Response, Router } from "express";
import bcrypt from "bcrypt"
import { prisma } from "@repo/database";
export const forgotPassword = Router()

forgotPassword.put("/password",async (req:Request,res:Response)=>{
    try {
        const email = req.body.email;
        const confirmPassword = req.body.confirmPassword;
        const hashPassword = await bcrypt.hash(confirmPassword,10);
        const result = await prisma.user.update({
            where:{
                email
            },
            data:{
                password:hashPassword.toString()
            }
        })
        if(result){
            res.status(200).send("forgot success.");
        }else{
            res.status(404).send("forgot fail.");
        }
    } catch (error) {
        console.log(error);
    }
})
