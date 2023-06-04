import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import workerRoadsRouter from "./worker-roads.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const workers = await prisma.worker.findMany({});
    res.status(200).json(workers);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const worker = await prisma.worker.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ worker });
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedWorker = await prisma.worker.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedWorker);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const createdWorker = await prisma.worker.create({
      data: req.body,
    });
    res.status(200).json(createdWorker);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedWorker = await prisma.worker.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedWorker);
  })
);

router.use("/:id/roads", workerRoadsRouter);

export default router;
