import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const roadElements = await prisma.roadElement.findMany({});
    res.status(200).json(roadElements);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const roadElement = await prisma.roadElement.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ roadElement });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const createdRoadElement = await prisma.roadElement.create({
      data: req.body,
    });
    res.status(200).json(createdRoadElement);
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updateRoadElement = await prisma.roadElement.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updateRoadElement);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedRoadElement = await prisma.roadElement.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedRoadElement);
  })
);

export default router;
