import { PaymentRequestBody } from "../types";

export const processPayment = async (body: PaymentRequestBody) => {
  try {
    const response = await fetch(
      `/api/payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching account:", error);
  }
};