import { MOCK_ENERGY_ACCOUNTS_API } from "../example-mocks/energyAccountsAPIMock";
import { MOCK_DUE_CHARGES_API } from "../example-mocks/dueChargesAPIMock";
import { getEnergyAccountById, getAllEnergyAccounts } from "./accountsService";
import { getHistory } from "./historyService";

jest.mock("./historyService");
jest.mock("../example-mocks/energyAccountsAPIMock");
jest.mock("../example-mocks/dueChargesAPIMock");

const mockPaymentHistory = [{
  accountId: "A-0001",
  date: "Date",
  amount: 100,
}];

const mockAccounts = [{
  id: "A-0001",
  type: "ELECTRICITY",
  address: "1 Greville Ct, Thomastown, 3076, Victoria",
  meterNumber: "1234567890",
}];

const mockDueCharges = [
  { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
  { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 }];

describe("Accounts Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getHistory as jest.Mock).mockResolvedValue(mockPaymentHistory);
    (MOCK_ENERGY_ACCOUNTS_API as jest.Mock).mockResolvedValue(mockAccounts);
    (MOCK_DUE_CHARGES_API as jest.Mock).mockResolvedValue(mockDueCharges);
  });
  describe("getAllEnergyAccounts", () => {
    it("should fetch all energy accounts with correct balance", async () => {
      const accounts = await getAllEnergyAccounts();
      expect(accounts).toBeDefined();
      expect(accounts[0].id).toEqual(mockAccounts[0].id);
      expect(accounts[0].balance).toBeDefined();
      expect(accounts[0].balance).toEqual(-70);
    });
  });

  describe("getEnergyAccountById", () => {
    it("should fetch an energy account by Id", async () => {
      const accountId = "A-0001";
      const account = await getEnergyAccountById(accountId);
      expect(account).toBeDefined();
      expect(account.id).toEqual(accountId);
    });

    it("should throw an error if the account is not found", async () => {
      const invalidAccountId = "invalid-id";
      await expect(getEnergyAccountById(invalidAccountId)).rejects.toThrow("Account not found");
    });
  });
});