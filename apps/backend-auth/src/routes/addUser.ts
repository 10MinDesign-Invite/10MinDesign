import { prisma } from "@repo/database";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { registerSchema } from "@repo/zod-input-validation";
import { ADMIN_EMAIL } from "../env-config.js";

export const addUser:Router = Router();

addUser.post("/user", async (req: Request, res: Response) => {
  try {
    const { name, email, image, id } = req.body;
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (!userExist?.password) {
      const result = await prisma.user.upsert({
        where: { email },
        update: {
          name,
          image,
          googleId: id?.toString(),
        },
        create: {
          name,
          email,
          image,
          googleId: id?.toString(),
          role: ADMIN_EMAIL === email ? 'admin' : 'user'
        },
      });
      if (result) {
        res.status(200).json({ id: result.id });
      } else {
        res.status(500).send("error from backend res..... EEEEEE");
      }
    } else {
      res.status(500).send("worng user from backend res..... EEEEEE");
    }
  } catch (error) {
    console.log(error);
  }
});

addUser.post("/signupuser", async (req: Request, res: Response) => {
  const email = req.body.email as string | undefined;
  const name = req.body.name as string | undefined;
  const password = req.body.password as string | undefined;

  try {
    if (!email || !name || !password) {
      res
        .status(400)
        .json({ success: false, message: "please provide all values" });
      return;
    }
    const vaidInput = registerSchema.safeParse({ name, email, password });
    if (!vaidInput.success) {
      res
        .status(400)
        .json({ success: false, message: vaidInput.error.message });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      res.status(400).json({ success: false, message: "user already exists" });
      return;
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      if (hashPassword) {
        await prisma.user.create({
          data: {
            email,
            name,
            password: hashPassword,
            role: ADMIN_EMAIL === email ? 'admin' : 'user'
          },
        });
        res.status(201).json({ success: true, message: "signup successfully" });
      } else {
        res.status(500).json({ success: false, message: "signup failed" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error OR see your internet",
    });
  }
});
