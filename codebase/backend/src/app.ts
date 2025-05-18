import { Router } from "express";
import energyAccountsRouter from "./controllers/accountsController";
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const api = Router()
  .use(energyAccountsRouter)

app.use('/api', api);

export default app;