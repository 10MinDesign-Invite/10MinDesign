import { Request, Response, Router } from "express";
import { prisma } from "@repo/database";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

export const getUsers: Router = Router();

getUsers.get(
  "/dashboard_data",
  adminMiddleware,
  async (req: Request, res: Response) => {
    try {
      const allUsers = await prisma.user.findMany({
        select: { googleId: true, email: true, role: true },
      });

      if (!allUsers || allUsers.length === 0) {
        res.status(404).json({ success: false, message: "No data found" });
        return;
      }

      const totalUsers = allUsers.length;
      const totalGoogleUsers = allUsers.filter(
        (u: any) => u.googleId !== null,
      ).length;
      const totalGmailUsers = allUsers.filter(
        (u: any) => u.googleId === null,
      ).length;
      const totalAdmins = allUsers.filter(
        (u: any) => u.role === "admin",
      ).length;

      res.status(200).json({
        totalUsers,
        totalGoogleUsers,
        totalGmailUsers,
        totalAdmins,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);
