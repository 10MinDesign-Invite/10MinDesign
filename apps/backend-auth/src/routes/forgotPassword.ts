import { prisma } from "@repo/database";
import { forgotPasswordSchema } from "@repo/zod-input-validation";
import { Request, Response, Router } from "express";
import { verifyOtpToken } from "../middleware/verifyOtpToken";
import bcrypt from "bcrypt";
export const forgotPassword = Router();

forgotPassword.put("/password",verifyOtpToken, async (req: Request, res: Response) => {
  try {
    const { email, password,confirmPassword } = req.body;
    const validInput = forgotPasswordSchema.safeParse({email, password, confirmPassword});
    if (!validInput.success) {
      res.status(400).send(validInput.error.errors[0].message);
      return;
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    if (!email || !password || !confirmPassword) {
       res.status(400).send("All fields are required.");
       return
    }
    if (password !== confirmPassword) {
       res.status(400).send("Passwords not match.");
       return
    }
    if(!hashPassword){
      console.log("failed to hash password");
      return;
    }
      const result = await prisma.user.update({
        where: {
          email:email
        },
        data: {
          password:hashPassword
        },
      });
      if (result) {
        res.status(200).json({success:true,message:"forgot success."});
      } else {
        res.status(404).json({success:false,message:"forgot fail."});
      }
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
