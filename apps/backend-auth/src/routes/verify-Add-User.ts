import { prisma } from "@repo/database";
import { verifyuser } from "@repo/zod-input-validation";
import { Request, Response, Router } from "express";


export const verify_Add_User = Router();

verify_Add_User.post("/user",async (req:Request,res:Response)=>{
    try {
        const email = req.body.email;
        const Data = req.body.customeData
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
        if(Data == "select only email"){
            res.status(200).send(user.email)
        }else if(Data == "select only id and role"){
            res.status(200).json({email:user?.email,id:user?.id,role:user?.role});
        }else{
            res.status(200).send(user);
        }
    } catch (error) {
        console.log(error)
    }
})

// import { Request, Response, Router } from "express";
// import { AuthMiddleware } from "../middleware/AuthMiddleware";
// import { prisma } from "@repo/database";
// import { decode } from "@auth/core/jwt";

// export const getUsers = Router();

// getUsers.get("/dashboard_data", async (req: Request, res: Response) => {
//     console.log("under route................................");
//     console.log(req.cookies)
//         const sessionToken = req.cookies['authjs.session-token'] || req.cookies['__Secure-next-auth.session-token'];
//     const decoded = await decode({
//       token: sessionToken,
//       secret: process.env.AUTH_SECRET!,
//       salt: '__Secure-authjs.session-token'
//     });
//     console.log(decoded,"data===========");
//     res.send(decoded)
// });