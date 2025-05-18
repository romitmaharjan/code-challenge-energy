import { MOCK_DUE_CHARGES_API } from "../example-mocks/dueChargesAPIMock";
import { MOCK_ENERGY_ACCOUNTS_API } from "../example-mocks/energyAccountsAPIMock";
import { EnergyAccountWithDueCharges } from "../types/index";
import { getHistory } from "./historyService";

const fetchMockAccounts = async () => {
  const accounts = await MOCK_ENERGY_ACCOUNTS_API();
  if (!accounts) throw new Error("Failed to fetch energy accounts");
  return accounts;
};

const fetchDueCharges = async () => {
  const dueCharges = await MOCK_DUE_CHARGES_API();
  if (!dueCharges) throw new Error("Failed to fetch due charges");
  return dueCharges;
};

export const getAllEnergyAccounts = async () => {
  const accounts = await fetchMockAccounts();
  const dueCharges = await fetchDueCharges();
  const paidHistory = await getHistory();

  return accounts.map((account) => {
    const pendingCharges = dueCharges
      .filter((charge) => charge.accountId === account.id)
      .reduce((acc, charge) => acc + charge.amount, 0);

    const paymentsMade = paidHistory
      .filter((payments) => payments.accountId === account.id)
      .reduce((acc, payments) => acc + payments.amount, 0);

    return {
      ...account,
      balance: pendingCharges - paymentsMade,
    };
  });
};

export const getEnergyAccountById = async (id: string): Promise<EnergyAccountWithDueCharges> => {
  const accounts = await getAllEnergyAccounts();

  const account = accounts.find((account) => account.id === id);
  if (!account) throw new Error("Account not found");
  return account;
};
