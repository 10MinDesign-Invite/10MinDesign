// routes/health.ts
import { Router } from "express";
import { prisma } from "@repo/database"; // adjust this import

export const healthRoute = Router();

healthRoute.get("/health", async (req, res) => {
  try {
    const result = await prisma.user.findFirst({ select: { id: true } });
    if(result){
        res.status(200).json({ status: "DB awake " });
    }else{
        res.status(404).json({ status: "DB sleep " });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "DB error" });
  }
});


