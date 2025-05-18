import { Request, Response, Router } from "express";
import { processPayment } from "../services/paymentService";
import { PaymentRequestBody } from "../types";

const router = Router();

router.post("/payment", async (req: Request, res: Response) => {
  const paymentRequest: PaymentRequestBody = req.body;

  try {
    const result = await processPayment(paymentRequest);
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