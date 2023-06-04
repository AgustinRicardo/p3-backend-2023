import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router({ mergeParams: true });

router.get(
    "/",
    errorChecked(async (req, res) => {
      const id  = req.params.id;
      const workers = await prisma.road.findMany({
          where: {
              workers : {
                  some: {
                      id: Number(id)
                  }
              }
          }
      });
      res.status(200).json(workers);
    })
);

export default router;