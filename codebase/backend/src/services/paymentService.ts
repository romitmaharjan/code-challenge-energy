import { PaymentHistory, PaymentRequestBody, PaymentResponse } from "../types";
import { getEnergyAccountById } from "./accountsService";
import fs from "fs";
import path from "path";

export const processPayment = async (paymentRequestBody: PaymentRequestBody): Promise<PaymentResponse> => {
  const { accountId, amount, cardDetails } = paymentRequestBody;
  const account = await getEnergyAccountById(accountId);
  if (!account) {
    throw new Error("Account not found");
  }
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount > 0 && cardDetails.cardNumber) {
          resolve({ success: true, message: "Payment processed successfully" });
        } else {
          reject({ success: false, message: "Payment failed" });
        }
      }, 1000);
    });
    storePaymentDetails(paymentRequestBody);
    return { success: true, message: "Payment processed successfully" };
  } catch (error) {
    throw new Error("Payment failed");
  }
}

const storePaymentDetails = (paymentDetails: PaymentRequestBody) => {
  const paymentsDir = path.resolve(__dirname, "../data");
  if (!fs.existsSync(paymentsDir)) {
    fs.mkdirSync(paymentsDir, { recursive: true });
  }
  const paymentsFilePath = path.join(paymentsDir, "payments.json");

  const paymentRecord: PaymentHistory = {
    accountId: paymentDetails.accountId,
    amount: paymentDetails.amount,
    date: new Date().toLocaleDateString("en-AU"),
  };

  let payments: PaymentHistory[] = [];
  if (fs.existsSync(paymentsFilePath)) {
    const fileData = fs.readFileSync(paymentsFilePath, "utf-8");
    payments = fileData ? JSON.parse(fileData) : [];
  }
  payments.push(paymentRecord);
  fs.writeFileSync(paymentsFilePath, JSON.stringify(payments, null, 2));
} 