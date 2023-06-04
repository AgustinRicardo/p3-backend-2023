import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const roads = await prisma.roadElement.findMany({});
    res.status(200).json(roads);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const road = await prisma.roadElement.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ road });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const createdRoad = await prisma.roadElement.create({
      data: req.body,
    });
    res.status(200).json(createdRoad);
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updateRoad = await prisma.roadElement.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updateRoad);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedRoad = await prisma.roadElement.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedRoad);
  })
);

export default router;
