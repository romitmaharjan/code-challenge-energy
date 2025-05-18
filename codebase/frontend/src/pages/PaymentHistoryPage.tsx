import { useEffect, useState } from "react";
import { PaymentHistory } from "../types";
import { getPaymentHistory } from "../apis/history";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);

  const fetchHistory = async () => {
    const payments = await getPaymentHistory();
    setPayments(payments);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Payment History</h2>
      <ul className="space-y-2">
        {payments.length > 0 ?
          payments.map(payment => (
            <li key={payment.accountId} className="bg-white p-4 rounded shadow">
              <div><strong>AccountId:</strong> ${payment.accountId}</div>
              <div><strong>Amount:</strong> ${payment.amount}</div>
              <div><strong>Date:</strong> {payment.date}</div>
            </li>
          ))
          :
          <div className="border-1 p-4 rounded shadow mx-auto"><p className="font-bold text-2xl">No Payments Yet</p></div>
        }
      </ul>
    </div>
  );
}
