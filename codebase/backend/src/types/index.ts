export interface EnergyAccount {
  id: string;
  type: "ELECTRICITY" | "GAS";
  address: string;
  meterNumber?: string;
  volume?: number;
};

export interface EnergyAccountWithDueCharges extends EnergyAccount {
  balance: number;
};

export interface DueCharges {
  id: string;
  accountId: string;
  date: string;
  amount: number
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

export interface PaymentResponse {
  success: boolean;
  message: string;
}

export interface PaymentHistory {
  accountId: string;
  amount: number;
  date: string;
}