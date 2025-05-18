import { Request, Response, Router } from "express";
import { getAllEnergyAccounts, getEnergyAccountById } from "../services/accountsService";

const router = Router();

router.get("/energy-accounts", async (req: Request, res: Response) => {
  try {
    const accounts = await getAllEnergyAccounts();
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching energy accounts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/energy-accounts/:id", async (req: Request, res: Response) => {
  try {
    const account = await getEnergyAccountById(req.params.id);
    res.json(account);
  } catch (error) {
    console.error("Error fetching energy account by Id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;