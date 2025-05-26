"use server"

import { prisma } from "@repo/database";
import bcrypt from "bcryptjs";

export async function forgotPassword(email:string,password:string,ConfirmPassword:string){
    const hashPassword = await bcrypt.hash(ConfirmPassword,10);
    try {
        const result = await prisma.user.update({
            where:{
                email
            },
            data:{
                password:hashPassword
            }
        })
        if(result){
            return {
                success:true,
                message:"password reset"
            }
        }
        
    } catch (error) {
         return {
            success:false,
            message:"internal server error"
        }
    }

}

