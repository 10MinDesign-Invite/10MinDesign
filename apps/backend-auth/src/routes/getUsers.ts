import { prisma } from "@repo/database";
import { Request, Response, Router } from "express";
import { verifyUser } from "../middleware/verifyUser";

export const getUsers = Router();

getUsers.get("/users", verifyUser, async (req: Request, res: Response) => {
  try {
    const GoogleIds = await prisma.user.findMany({
      select: { accounts: { select: { providerId: true } } },
    });
    if (GoogleIds.length > 0 && GoogleIds) {
      const providerIds = GoogleIds.flatMap((u) =>
        u.accounts.map((acc) => acc.providerId)
      );
      res.status(200).send(providerIds);
      return;
    } else {
      res.status(404).json({ success: false, message: "no data" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
});
