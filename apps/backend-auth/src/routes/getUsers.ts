import { Request, Response, Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { prisma } from "@repo/database";

export const getUsers = Router();

getUsers.get("/all_users_data",AuthMiddleware,async(req:Request,res:Response)=>{
    try {
        
            const Users = await prisma.user.findMany({select:{email:true,name:true,id:true,image:true,googleId:true}});
           if(Users.length > 0 && Users){
                res.status(200).send(Users);
                return
           }else{
                res.status(404).json({success:false,message:"no data"});
                return
           }
        
        
    } catch (error) {
        console.log(error)
    }
})
getUsers.get("/total_users_count",AuthMiddleware,async(req:Request,res:Response)=>{
    try {
        
            const UsersIds = await prisma.user.findMany({select:{id:true}});
            if(UsersIds.length > 0 && UsersIds){
                res.status(200).send(UsersIds);
                return 
            }else{
                res.status(404).json({success:false,message:"no data"});
                return 
            }
        
        
    } catch (error) {
        console.log(error)
    }
})
getUsers.get("/total_auth_users_count",AuthMiddleware,async(req:Request,res:Response)=>{
    try {
        
            const GoogleIds = await prisma.user.findMany({select:{googleId:true}});
            if(GoogleIds.length > 0 && GoogleIds){
                res.status(200).send(GoogleIds);
                return
            }else{
                res.status(404).json({success:false,message:"no data"});
                return
            }
        
    } catch (error) {
        console.log(error)
    }
})
