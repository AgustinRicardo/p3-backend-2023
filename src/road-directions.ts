import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import workersRouter from "./workers.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const roads = await prisma.roadDirection.findMany({});
    res.status(200).json(roads);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const road = await prisma.roadDirection.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ road });
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updateRoad = await prisma.roadDirection.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updateRoad);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const createdRoad = await prisma.roadDirection.create({
      data: req.body,
    });
    res.status(200).json(createdRoad);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedRoad = await prisma.roadDirection.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedRoad);
  })
);

export default router;
