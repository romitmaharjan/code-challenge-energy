import { useEffect, useState } from "react";
import { Account } from "../types";
import AccountCard from "../components/AccountCard";
import PaymentModal from "../components/PaymentModal";
import { getEnergyAccount } from "../apis/accounts";

export default function HomePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const fetchAccounts = async () => {
    const accounts = await getEnergyAccount();
    setAccounts(accounts);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter(a =>
    a.type.toLowerCase().includes(filter.toLowerCase()) &&
    a.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center max-w-lg mx-auto">
        <select
          name="energyType"
          className="p-2 border rounded w-80"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value={""}>All</option>
          <option value={"Electric"}>Electricity</option>
          <option value={"Gas"}>Gas</option>
        </select>
        <input
          type="text"
          placeholder="Search by address"
          className="p-2 border rounded w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredAccounts.map(account => (
        <AccountCard
          key={account.id}
          account={account}
          onPay={() => setSelectedAccount(account)}
        />
      ))}
      {selectedAccount && (
        <PaymentModal
          account={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
}
