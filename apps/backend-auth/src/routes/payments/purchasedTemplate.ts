import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware";

export const purchasedTemplate:Router = Router()

purchasedTemplate.post("/template", authMiddleware, async (req: Request, res: Response) => {
    try {
        const {templateName} = req.body;
        const cookie = req.cookies[`purchased--${templateName}`];
        if(!cookie){
            res.status(404).send("not Purchased")
            return
        }
        res.status(200).send(templateName)
    } catch (error) {
        console.log(error);
    }
})