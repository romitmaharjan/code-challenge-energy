export interface Account {
  id: string;
  type: "ELECTRICITY" | "GAS";
  address: string;
  meterNumber?: string;
  volume?: number;
  balance: number;
};

export interface CreditCardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentRequestBody {
  accountId: string;
  amount: number;
  cardDetails: CreditCardDetails;
};

export interface PaymentHistory {
  accountId: string;
  amount: number;
  date: string;
}
