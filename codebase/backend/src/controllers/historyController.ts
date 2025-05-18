import { Request, Response, Router } from "express";
import { getHistory } from "../services/historyService";

const router = Router();

router.get("/history", async (req: Request, res: Response) => {

  try {
    const result = await getHistory();
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default router;