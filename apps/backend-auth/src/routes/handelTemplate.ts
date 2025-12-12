import { prisma } from "@repo/database";
import { templateSchema } from "@repo/zod-input-validation/template-types";
import { Request, Response, Router } from "express";

export const handelTemplate: Router = Router();

handelTemplate.post("/add", async (req: Request, res: Response) => {
  try {
    const { templateId, templateData, category } = req.body;
    const { data, error } = templateSchema.safeParse({
      templateId,
      templateData,
      category,
    });
    if (error) {
      res.status(400).send("invalid inputs...");
      return;
    }

    switch (category) {
      case "wedding":
        const wedding = await prisma.templateWedding.create({
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (wedding) {
          res.status(200).send("success");
        }
        break;
      case "birthday":
        const birthday = await prisma.templateBirthday.create({
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (birthday) {
          res.status(200).send("success");
        }
        break;
      case "rip":
        const rip = await prisma.templateRip.create({
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (rip) {
          res.status(200).send("success");
        }
        break;
      case "opening":
        const opening = await prisma.templateOpening.create({
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (opening) {
          res.status(200).send("success");
        }
        break;
      case "festival":
        const festival = await prisma.templateFestival.create({
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (festival) {
          res.status(200).send("success");
        }
        break;
      default:
        console.log("something wrong provide some valid category");
    }
  } catch (error) {
    console.log(error);
  }
});

handelTemplate.put("/update", async (req: Request, res: Response) => {
  try {
    const { templateId, templateData, category } = req.body;
    const { data, error } = templateSchema.safeParse({
      templateId,
      templateData,
      category,
    });
    console.log();
    if (error) {
      res.status(400).send("invalid inputs...");
      return;
    }

    switch (category) {
      case "wedding":
        const wedding = await prisma.templateWedding.update({
          where: {
            templateId: data.templateId,
          },
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (wedding) {
          res.status(200).send("success");
        }
        break;
      case "birthday":
        const birthday = await prisma.templateBirthday.update({
          where: {
            templateId: data.templateId,
          },
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (birthday) {
          res.status(200).send("success");
        }
        break;
      case "rip":
        const rip = await prisma.templateRip.update({
          where: {
            templateId: data.templateId,
          },
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (rip) {
          res.status(200).send("success");
        }
        break;
      case "opening":
        const opening = await prisma.templateOpening.update({
          where: {
            templateId: data.templateId,
          },
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (opening) {
          res.status(200).send("success");
        }
        break;
      case "festival":
        const festival = await prisma.templateFestival.update({
          where: {
            templateId: data.templateId,
          },
          data: {
            templateId: data.templateId,
            TemplateData: data.templateData,
          },
        });
        if (festival) {
          res.status(200).send("success");
        }
        break;
      default:
        console.log("something wrong provide some valid category");
    }
  } catch (error) {
    console.log(error);
  }
});

handelTemplate.put("/delete", async (req: Request, res: Response) => {
  try {
    const { templateId, category } = req.body;

    if (!templateId || !category) {
      res.status(400).send("invalid inputs...");
      return;
    }

    switch (category) {
      case "wedding":
        const wedding = await prisma.templateWedding.delete({
          where: {
            templateId,
          },
        });
        if (wedding) {
          res.status(200).send("success");
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "birthday":
        const birthday = await prisma.templateBirthday.delete({
          where: {
            templateId,
          },
        });
        if (birthday) {
          res.status(200).send("success");
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "rip":
        const rip = await prisma.templateRip.delete({
          where: {
            templateId,
          },
        });
        if (rip) {
          res.status(200).send("success");
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "opening":
        const opening = await prisma.templateOpening.delete({
          where: {
            templateId,
          },
        });
        if (opening) {
          res.status(200).send("success");
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "festival":
        const festival = await prisma.templateFestival.delete({
          where: {
            templateId,
          },
        });
        if (festival) {
          res.status(200).send("success");
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      default:
        console.log("something wrong provide some valid category");
    }
  } catch (error) {
    console.log(error);
  }
});

handelTemplate.post("/get", async (req: Request, res: Response) => {
  try {
    const { templateId, category } = req.body;

    if (!templateId || !category) {
      res.status(400).send("invalid inputs...");
      return;
    }

    switch (category) {
      case "wedding":
        const wedding = await prisma.templateWedding.findUnique({
          where: {
            templateId,
          },
        });
        if (wedding) {
          res.status(200).send(wedding);
          return;
        } else {
          res
            .status(404)
            .json({ error: "operation failed of component not found..." });
        }
        break;
      case "birthday":
        const birthday = await prisma.templateBirthday.findUnique({
          where: {
            templateId,
          },
        });
        if (birthday) {
          res.status(200).send(birthday);
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "rip":
        const rip = await prisma.templateRip.findUnique({
          where: {
            templateId,
          },
        });
        if (rip) {
          res.status(200).send(rip);
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "opening":
        const opening = await prisma.templateOpening.findUnique({
          where: {
            templateId,
          },
        });
        if (opening) {
          res.status(200).send(opening);
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      case "festival":
        const festival = await prisma.templateFestival.findUnique({
          where: {
            templateId,
          },
        });
        if (festival) {
          res.status(200).send(festival);
          return;
        } else {
          res.status(404).send("operation failed of component not found...");
        }
        break;
      default:
        console.log("something wrong provide some valid category");
    }
  } catch (error) {
    console.log(error);
  }
});
