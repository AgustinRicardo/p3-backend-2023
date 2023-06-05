import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router({ mergeParams: true });
 
router.get(
  "/",
  errorChecked(async (req, res) => {
    const id  = req.params.id;
    const workers = await prisma.worker.findMany({
        where: {
            roads : {
                some: {
                    id: Number(id)
                }
            }
        }
    });
    res.status(200).json(workers);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const id  = req.params.id;

    const createdRoad = await prisma.worker.create({
      data: { 
        ...req.body,
        roads: {
          connect: [{ id: Number(id) }],
        }
       },
    });

    res.status(200).json(createdRoad);
  })
);

export default router;
