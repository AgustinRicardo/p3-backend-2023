import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.road.deleteMany({});
await prisma.roadDirection.deleteMany({});
await prisma.worker.deleteMany({});

await prisma.roadDirection.createMany({
  data: [
    { direction: "West" },
    { direction: "East" },
    { direction: "North" },
    { direction: "South" },
  ],
});

console.log('RoadDirections created');

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

console.log(`Road ${road1.id} ${road1.name} created with workers`);

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

console.log(`Road ${road2.id} ${road2.name} created with workers`);
