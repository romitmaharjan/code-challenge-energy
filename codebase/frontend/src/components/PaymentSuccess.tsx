export default function PaymentOutcome({ onClose, outcome }: { onClose: () => void, outcome: boolean }) {
  return (
    <div className="text-center space-y-4">
      {outcome ? 
      <h3 className="text-lg font-bold text-green-600">Payment Successful!</h3>
      :
      <h3 className="text-lg font-bold text-red-600">Payment Failed!</h3>
      }
      <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">Close</button>
    </div>
  );
}
