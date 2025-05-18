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