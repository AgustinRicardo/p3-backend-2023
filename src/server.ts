import express from "express";
import { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import roadsRouter from './roads.js';
import { defaultErrorHandler } from "./utils.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/roads", roadsRouter);

app.use(defaultErrorHandler)

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`API listening on: ${SERVER_PORT}`);
});
