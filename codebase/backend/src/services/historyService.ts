import fs from "fs";
import path from "path";
import { PaymentHistory } from "../types";

export const getHistory = async (): Promise<PaymentHistory[] | []> => {
  const historyFilePath = path.join(__dirname, "../data/payments.json");
  if (!fs.existsSync(historyFilePath)) {
    return [];
  }
  const fileData = fs.readFileSync(historyFilePath, "utf-8");
  return fileData ? JSON.parse(fileData) : [];
}