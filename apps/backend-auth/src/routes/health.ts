
import { Router } from "express";

export const healthRoute = Router();

healthRoute.get("/check", async (req, res) => {
  try {
     res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "DB error" });
  }
});
// healthRoute.get("/check", async (req, res) => {
//   try {
//     const result = await prisma.user.findFirst({ select: { id: true } });
//     if(result){
//         res.status(200).json({ status: "DB awake " });
//     }else{
//         res.status(404).json({ status: "DB sleep " });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ status: "DB error" });
//   }
// });


