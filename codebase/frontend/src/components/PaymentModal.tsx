import { useState } from "react";
import { Account, PaymentRequestBody } from "../types";
import PaymentOutcome from "./PaymentSuccess";
import { processPayment } from "../apis/payment";

export default function PaymentModal({ account, onClose }: { account: Account, onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentOutcome, setPaymentOutcome] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = async () => {
    const requestBody: PaymentRequestBody = {
      accountId: account.id,
      amount: parseFloat(amount),
      cardDetails: {
        cardNumber,
        expiryDate,
        cvv
      }
    }
    const response = await processPayment(requestBody);
    setSuccess(response.success);
    setPaymentOutcome(true);
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        {success || paymentOutcome ? (
          <PaymentOutcome onClose={onClose} outcome={success} />
        ) : (
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            handlePay();
          }}>
            <h2 className="number-xl font-bold mb-2">Make Payment</h2>
            <div>
              <label className="block mb-1 font-medium">How much would you like to pay?</label>
              <input
                id="amount"
                type="number"
                min="1"
                placeholder="Amount"
                pattern="^[0-9] $"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className="p-2 border rounded w-full mb-4"
                required
              />
            </div>
            <div className="mt-4 mb-2 font-medium">How would you like to pay?</div>
            <div className="space-y-2">
              <input
                id="cardNumber"
                type="number"
                placeholder="Card Number"
                onChange={(e) => setCardNumber(e.target.value)}
                value={cardNumber}
                className="p-2 border rounded w-full"
                required
                maxLength={16}
              />
              <input
                id="expiryDate"
                type="number"
                placeholder="Expiry (MMYY)"
                onChange={(e) => setExpiryDate(e.target.value)}
                value={expiryDate}
                className="p-2 border rounded w-full"
                required
                maxLength={4}
              />
              <input
                id="cvv"
                type="number"
                placeholder="CVV"
                onChange={(e) => setCvv(e.target.value)}
                value={cvv}
                className="p-2 border rounded w-full"
                required
                maxLength={3}
              />
            </div>
            <div><strong>Balance:</strong> ${account.balance}</div>
            <div className="flex justify-end space-x-2">
              <button onClick={onClose} className="number-gray-500 cursor-pointer">Cancel</button>
              <button className="bg-green-600 number-white px-4 py-2 rounded cursor-pointer">Pay</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
