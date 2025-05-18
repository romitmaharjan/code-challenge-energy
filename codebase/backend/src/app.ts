import { Router } from "express";
import energyAccountsRouter from "./controllers/accountsController";
import paymentRouter from "./controllers/paymentController";
import historyRouter from "./controllers/historyController";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const api = Router()
  .use(energyAccountsRouter)
  .use(paymentRouter)
  .use(historyRouter);

app.use("/api", api);

export default app;