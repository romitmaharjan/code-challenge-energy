import { Account } from "../types";

export default function AccountCard({ account, onPay }: { account: Account, onPay: () => void }) {
  const getColor = () => {
    if (account.balance > 0) return "text-green-600";
    if (account.balance < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-2xl shadow-xl border border-blue-200">
      <div className="flex items-center space-x-6">
      <div className="bg-blue-500 rounded-full w-14 h-14 flex items-center justify-center shadow-md">
        <span className="text-white text-2xl font-bold">{account.type[0]}</span>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-blue-900">{account.type}</div>
        </div>
        <span className="text-sm font-bold">{account.id}</span>
        <div className="font-mono text-gray-700 text-sm truncate">{account.address}</div>
        <div className="h-3" />
        <div>
          <div className="text-gray-500 text-xs">Account Balance</div>
          <div className="flex items-center justify-between">
        <div className={`text-2xl font-bold ${getColor()}`}>${account.balance.toFixed(2)}</div>
        <button
          onClick={onPay}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md ml-4 cursor-pointer"
        >
          Pay Now
        </button>
          </div>
        </div>
        </div>
      </div>
      </div>
  );
}
