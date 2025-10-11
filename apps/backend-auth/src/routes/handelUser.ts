import { prisma } from "@repo/database";
import { Request, Response, Router } from "express";
import { signinSchema, signupSchema } from "@repo/zod-input-validation";
export const handelUser = Router();

import { redis } from "@repo/redis";
import { generateSessionId } from "../utils/generateSessionId";
import bcrypt from "bcrypt";

handelUser.post("/signinuser", async (req: Request, res: Response) => {
  const email = req.body.email as string | undefined;
  const password = req.body.password as string | undefined;

  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "please provide all values" });
      return;
    }
    const { data, success, error } = signinSchema.safeParse({
      email,
      password,
    });
    if (!success) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      res.status(400).json({ success: false, message: "user not exists" });
      return;
    } else {
      if (user.password === null) {
        res.status(401).json({ success: false, message: "Invalid Credential" });
      }
      const hashPassword = await bcrypt.compare(data.password, user.password!);
      if (!hashPassword) {
        res.status(401).json({ success: false, message: "Invalid Credential" });
        return;
      } else {
        const sessionId = await generateSessionId();
        await redis.set(
          `sessionId:${sessionId}`,
          { id: user.id, email: user.email, name: user.name, role: user.role },
          {
            ex: 7 * 24 * 60 * 60 * 1000,
          },
        );
        res
          .cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production" ? true : false,
            sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .json({ success: true, message: "signin successfull..." });
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

handelUser.post("/signupuser", async (req: Request, res: Response) => {
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
    const { data, success, error } = signupSchema.safeParse({
      name,
      email,
      password,
    });
    if (!success) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      res.status(400).json({ success: false, message: "user already exists" });
      return;
    } else {
      const hashPassword = await bcrypt.hash(data.password, 10);

      if (hashPassword) {
        await prisma.user.create({
          data: {
            email,
            name,
            password: hashPassword,
          },
        });
        const sessionId = await generateSessionId();
        await redis.set(
          `sessionId:${sessionId}`,
          { email, name, role: "user" },
          {
            ex: 7 * 24 * 60 * 60 * 1000,
          },
        );
        res
          .cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production" ? true : false,
            sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .json({ success: true, message: "signup successfull..." });
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

handelUser.post("/logout", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.cookies;
    if (!sessionId) res.send("error while logout..");
    const result = await redis.del(`sessionId:${sessionId}`);
    if (result) {
      res
        .clearCookie("sessionId", {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production" ? true : false,
          sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        })
        .clearCookie("google_code_verifier", {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production" ? true : false,
          sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        })
        .clearCookie("google_oauth_state", {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production" ? true : false,
          sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        })
        .json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
});
