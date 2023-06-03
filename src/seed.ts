import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roadDirections = await prisma.roadDirection.createMany({
  data: [
    { direction: "West" },
    { direction: "East" },
    { direction: "North" },
    { direction: "South" },
  ],
});

console.log(`Road directions created ${roadDirections}`);

const westDirection = await prisma.roadDirection.findFirst({
  where: { direction: { equals: 'West' } },
});

const road1 = await prisma.road.create({
  data: {
    name: "Torrent de les Flors",
    roadDirectionId: westDirection?.id,
    workers: {
      create: [
        { name: "Agustín", lastName: "Rodríguez" },
        { name: "Ricardo", lastName: "Mendoza" },
      ],
    },
  },
});

const workerAgustin = await prisma.worker.findFirstOrThrow({
  where: { name: { equals: "Agustín" }, lastName: "Rodríguez" },
});

const road2 = await prisma.road.create({
  data: {
    name: "Bac de Roda",
    roadDirectionId: westDirection?.id,
    workers: {
      connect: [{ id: workerAgustin.id }],
      create: { name: "Delio", lastName: "Gonzalez" },
    },
  },
});

const eastDirection = await prisma.roadDirection.findFirst({
  where: { direction: { equals: "East " } },
});

const northDirection = await prisma.roadDirection.findFirst({
  where: { direction: { equals: "North " } },
});

const southDirection = await prisma.roadDirection.findFirst({
  where: { direction: { equals: "South " } },
});
