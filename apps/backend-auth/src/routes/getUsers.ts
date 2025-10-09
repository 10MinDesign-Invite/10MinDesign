// import { Request, Response, Router } from "express";
// import { AuthMiddleware } from "../middleware/AuthMiddleware";
// import { prisma } from "@repo/database";

// export const getUsers = Router();

// getUsers.get("/all_users_data",AuthMiddleware,async(req:Request,res:Response)=>{
//     try {
        
//             const Users = await prisma.user.findMany({select:{email:true,name:true,id:true,image:true,googleId:true}});
//            if(Users.length > 0 && Users){
//                 res.status(200).send(Users);
//                 return
//            }else{
//                 res.status(404).json({success:false,message:"no data"});
//                 return
//            }
        
        
//     } catch (error) {
//         console.log(error)
//     }
// })
// getUsers.get("/total_users_count",AuthMiddleware,async(req:Request,res:Response)=>{
//     try {
        
//             const UsersIds = await prisma.user.findMany({select:{id:true}});
//             if(UsersIds.length > 0 && UsersIds){
//                 res.status(200).send(UsersIds);
//                 return 
//             }else{
//                 res.status(404).json({success:false,message:"no data"});
//                 return 
//             }
        
        
//     } catch (error) {
//         console.log(error)
//     }
// })
// getUsers.get("/total_auth_users_count",AuthMiddleware,async(req:Request,res:Response)=>{
//     try {
        
//             const GoogleIds = await prisma.user.findMany({select:{googleId:true}});
//             if(GoogleIds.length > 0 && GoogleIds){
//                 res.status(200).send(GoogleIds);
//                 return
//             }else{
//                 res.status(404).json({success:false,message:"no data"});
//                 return
//             }
        
//     } catch (error) {
//         console.log(error)
//     }
// })


import { Request, Response, Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { prisma } from "@repo/database";
import { decode } from "@auth/core/jwt";

export const getUsers = Router();

getUsers.get("/dashboard_data", async (req: Request, res: Response) => {
    console.log("under route................................");
    console.log(req.cookies)
        const sessionToken = req.cookies['authjs.session-token'] || req.cookies['__Secure-next-auth.session-token'];
    const decoded = await decode({
      token: sessionToken,
      secret: process.env.AUTH_SECRET!,
      salt: '__Secure-authjs.session-token'
    });
    console.log(decoded,"data===========");
    res.send(decoded)
});
