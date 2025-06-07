import { prisma } from "@repo/database";
import { Request, Response, Router } from "express";


export const addUser = Router();

addUser.post("/user",async (req:Request,res:Response)=>{
    try {
        const {name,email,image,id} = req.body;
         await prisma.user.create({
                    data:{
                      name,
                      email,
                      image,
                      googleId:id?.toString(),
                    }
                  });
    } catch (error) {
        console.log(error);
    }
})