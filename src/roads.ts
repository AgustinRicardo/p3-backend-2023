import { Router } from "express";
import prisma from './prisma-client.js'

const router = Router();

router.get("/", async (req, res) => {
    try {
      const roads = await prisma.road.findMany({});
      res.status(200).json(roads);
    } catch (e) {
      res.status(500).json({ 
          type: e.constructor.name, 
          message: e.toString() 
      });
    }
  });

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const road = await prisma.road.findUnique({
        where: {
            id: Number(id)
        },
      });
      
      if (road === null){
        return res.status(404).json({
            error: `Road with id ${id} was not found`
        });
      }

      res.status(200).json({road});
    } catch (e) {
      res.status(500).json({ 
          type: e.constructor.name, 
          message: e.toString() 
      });
    }
  });

export default router;