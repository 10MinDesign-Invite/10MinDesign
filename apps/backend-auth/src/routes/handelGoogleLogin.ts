import { Request, Response, Router } from "express";
import arctic from "arctic";
import { google } from "../config/googleConfig";
import { prisma } from "@repo/database";
import { GoogleDataType } from "@repo/zod-input-validation";
import { generateSessionId } from "../utils/generateSessionId";
import { redis } from "@repo/redis";

export const handelGoogleLogin = Router();

handelGoogleLogin.get("/google", async (req, res) => {
  try {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, [
      "openid",
      "profile",
      "email",
    ]);

    res.cookie("google_oauth_state", state, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
    });

    res.cookie("google_code_verifier", codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
    });
    return res.redirect(url.toString());
  } catch (error) {
    console.log(error);
  }
});

handelGoogleLogin.get("/google/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const {
      google_oauth_state: storedState,
      google_code_verifier: storedCodeVerifier,
    } = req.cookies;

    if (
      code === null ||
      storedState === null ||
      state !== storedState ||
      storedCodeVerifier === null
    ) {
      return res.redirect("/signin");
    }

    const tokens = await google.validateAuthorizationCode(
      code as string,
      storedCodeVerifier,
    );
    const claims = arctic.decodeIdToken(
      tokens.idToken(),
    ) as GoogleDataType | null;

    const user = await prisma.user.findUnique({
      where: {
        email: claims?.email,
      },
    });

    const sessionId = await generateSessionId();

    if (user?.email === undefined) {
      await prisma.user.create({
        data: {
          name: claims?.name,
          email: claims?.email!,
          image: claims?.picture,
          googleId: claims?.sub,
          role:
            `${process.env.ADMIN_EMAIL}` == claims?.email ? "admin" : "user",
        },
      });
    }
    const val = await redis.set(
      `sessionId:${sessionId}`,
      {
        name: claims?.name,
        email: claims?.email,
        image: claims?.picture,
        role: process.env.ADMIN_EMAIL == claims?.email ? "admin" : "user",
      },
      { ex: 7 * 24 * 60 * 60 * 1000 },
    );
    if (val === "OK") {
      res
        .cookie("sessionId", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production" ? true : false,
          sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/",
        })
        .redirect(`${process.env.FRONTEND_URL}`);
    }
  } catch (error) {}
});
