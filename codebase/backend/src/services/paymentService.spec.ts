import { PaymentRequestBody } from "../types";
import { processPayment } from "./paymentService";

describe("Payment Service", () => {
  describe("processPayment", () => {
    it("should process a payment successfully", async () => {
      const mockPaymentRequestBody: PaymentRequestBody = {
        accountId: "A-0001",
        amount: 100,
        cardDetails: { cardNumber: "1234-5678-9012-3456", expiryDate: "12/25", cvv: "123" },
      };
      const result = await processPayment(mockPaymentRequestBody);
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.message).toEqual("Payment processed successfully");
    });

    it("should throw an error if the account is not found", async () => {
      const mockPaymentRequestBody: PaymentRequestBody = {
        accountId: "invalid-id",
        amount: 100,
        cardDetails: { cardNumber: "1234-5678-9012-3456", expiryDate: "12/25", cvv: "123" },
      };

      await expect(processPayment(mockPaymentRequestBody)).rejects.toThrow("Account not found");
    });

    it("should throw an error if the payment fails", async () => {
      const mockPaymentRequestBody: PaymentRequestBody = {
        accountId: "A-0001",
        amount: -100,
        cardDetails: { cardNumber: "1234-5678-9012-3456", expiryDate: "12/25", cvv: "123" },
      };

      await expect(processPayment(mockPaymentRequestBody)).rejects.toThrow("Payment failed");
    });
  });
});