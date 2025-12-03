import { Request, Response, Router } from "express"
import { redis } from "../config/redis-config.js";
import { prisma } from "@repo/database";
import { paginationSchema, weddingInputSchema } from "@repo/zod-input-validation/template-types";

export const handelWedding:Router = Router();

handelWedding.post("/add", async (req: Request, res: Response) => {
  try {
    const { categoryName, imageUrl,price,width,componentName } = req.body;
    const validInput = weddingInputSchema.safeParse({categoryName,imageUrl,price,width,componentName});
    if(validInput.error){
      res.send("invalid input..")
      return
    }
     await prisma.wedding.create({
      data: {
        componentName:validInput.data?.componentName,
        price:Number(validInput.data.price),
        width:Number(validInput.data.width),
        imageUrl:validInput.data.imageUrl
      },
    });
    
    const keys = await redis.keys(`${categoryName}:*`);
    if(keys.length > 0) await redis.del(...keys);

    res.status(200).json({success:true,message:"new design added..."});
  } catch (error) {
    console.warn(error);
  }
})

handelWedding.post("/get", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const items = parseInt(req.body.items) || 10;
    const categoryName = req.body.categoryName;
    
    const validInput = paginationSchema.safeParse({page,items,categoryName})
    if(validInput.error){
      res.send("invalid pagination input")
      return
    }
    const skip = (page - 1) * items;
    const take = items;

   const redisData = await redis.get(`${categoryName}:${page}`)
   if(redisData){
    res.status(200).send(redisData);
   }else{
     const result = await prisma.wedding.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id: 'asc',
      },
    });

    const totalItems = await prisma.wedding.count();
    const totalPages = Math.ceil(totalItems / items);

    await redis.set(`${categoryName}:${page}`,{
      totalPages,
      currentPage:page,
      result
    })
    res.json({
      currentPage: page,
      totalPages,
      result
    });

   }
    
  } catch (error) {
    console.warn(error)
  }
})