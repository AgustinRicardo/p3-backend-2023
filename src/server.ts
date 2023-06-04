import express from "express";
import { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import roadsRouter from './roads.js';
import roadDirectionRouter from './road-directions.js'
import roadElementRouter from './road-elements.js'
import { defaultErrorHandler } from "./utils.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/roads", roadsRouter);
app.use("/roadDirections", roadDirectionRouter);
app.use("/roadElements", roadElementRouter);

app.use(defaultErrorHandler)

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`API listening on: ${SERVER_PORT}`);
});
