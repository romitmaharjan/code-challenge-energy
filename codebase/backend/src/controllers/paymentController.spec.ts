import request from "supertest";
import express from "express";
import router from "./paymentController";
import * as paymentService from "../services/paymentService";
import { PaymentRequestBody } from "../types";

const app = express();
app.use(express.json());
app.use(router);

jest.mock("../services/paymentService");

describe("POST /payment", () => {
  const mockPaymentRequestBody: PaymentRequestBody = {
    accountId: "A-0001",
    amount: 100,
    cardDetails: { cardNumber: "1234-5678-9012-3456", expiryDate: "12/25", cvv: "123" },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should process payment and return result", async () => {
    const mockResult = { success: true, message: "Payment processed successfully" };
    (paymentService.processPayment as jest.Mock).mockResolvedValue(mockResult);

    const res = await request(app)
      .post("/payment")
      .send(mockPaymentRequestBody);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResult);
    expect(paymentService.processPayment).toHaveBeenCalledWith(mockPaymentRequestBody);
  });

  it("should return 400 and error message if processPayment throws an Error", async () => {
    (paymentService.processPayment as jest.Mock).mockRejectedValue(new Error("Invalid card"));

    const res = await request(app)
      .post("/payment")
      .send(mockPaymentRequestBody);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid card" });
    expect(paymentService.processPayment).toHaveBeenCalledWith(mockPaymentRequestBody);
  });

  it("should return 500 and generic error", async () => {
    (paymentService.processPayment as jest.Mock).mockRejectedValue("Some error");

    const res = await request(app)
      .post("/payment")
      .send(mockPaymentRequestBody);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal Server Error" });
    expect(paymentService.processPayment).toHaveBeenCalledWith(mockPaymentRequestBody);
  });
});