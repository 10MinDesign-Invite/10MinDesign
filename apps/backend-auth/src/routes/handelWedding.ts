import { prisma } from "@repo/database";
import { NextFunction, Request, Response, Router } from "express"

export const handelWedding = Router();

handelWedding.post("/add",async (req:Request,res:Response)=>{
    try {
        const {componentName,imageUrl} = req.body;
        console.log(componentName,imageUrl)
        const result = await prisma.wedding.create({
                  data: {
                    componentName,
                    imageUrl
                  },
                });
        console.log(result)
        res.send(result)
    } catch (error) {
        console.warn(error);
    }
})

handelWedding.post("/get",async (req:Request,res:Response)=>{
  try {
    const page = parseInt(req.body.page) || 1; 
    const items = parseInt(req.body.items) || 10;
    const skip = (page - 1) * items;
    const take = items;

    const result = await prisma.wedding.findMany({
            skip: skip,
            take: take,
            orderBy: {
                id: 'asc',
            },
        });

        
        const totalItems = await prisma.wedding.count();
        const totalPages = Math.ceil(totalItems / items);

        res.json({
            items,
            currentPage: page,
            item: items,
            totalItems,
            totalPages,
            result
        });
  } catch (error) {
    console.warn(error)
  }
})