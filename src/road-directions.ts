import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const roadDirections = await prisma.roadDirection.findMany({});
    res.status(200).json(roadDirections);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const roadDirection = await prisma.roadDirection.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ roadDirection });
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updateRoadDirection = await prisma.roadDirection.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updateRoadDirection);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const createdRoadDirection = await prisma.roadDirection.create({
      data: req.body,
    });
    res.status(200).json(createdRoadDirection);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedRoadDirection = await prisma.roadDirection.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedRoadDirection);
  })
);

export default router;
