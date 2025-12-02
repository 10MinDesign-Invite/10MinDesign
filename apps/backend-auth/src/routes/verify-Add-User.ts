import { prisma } from "@repo/database";
import { verifyuser } from "@repo/zod-input-validation";
import { Request, Response, Router } from "express";

export const verify_Add_User:Router = Router();

verify_Add_User.post("/user", async (req: Request, res: Response) => {
  try {
    console.log("=======================================================================================================")
    const email = req.body.email;
    const Data = req.body.customeData;
    const parseData = verifyuser.safeParse({ email });
    if (!parseData.success) {
      res.send("email format not correct");
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (!user) {
      res.status(404).send("user not found");
      return;
    }
    if (Data == "select only email") {
      res.status(200).send(user.email);
    } else if (Data == "select only id and role") {
      res
        .status(200)
        .json({ email: user?.email, id: user?.id, role: user?.role });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
  }
});
