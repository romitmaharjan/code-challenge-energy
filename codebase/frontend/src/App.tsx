import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Energy Accounts</h1>
          <div className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/history" className="text-blue-600 hover:underline">Payment History</Link>
          </div>
        </nav>
        <main className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<PaymentHistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
