import { useState, useEffect } from "react";
import { CaretRight } from "phosphor-react";

// Ví dụ data tạm thời, sau này có thể fetch từ API
const dummyTransactions = [
  {
    id: 1,
    date: "2025-09-01",
    service: "Hotel Booking - Nha Trang",
    amount: 1200000,
    status: "Paid",
  },
  {
    id: 2,
    date: "2025-08-28",
    service: "Flight Booking - Hanoi to Saigon",
    amount: 2500000,
    status: "Paid",
  },
  {
    id: 3,
    date: "2025-08-20",
    service: "Restaurant Voucher",
    amount: 450000,
    status: "Pending",
  },
];

export default function MyCard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Thay bằng API call thực tế
    setTransactions(dummyTransactions);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-md px-2 transition"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{tx.service}</span>
                <span className="text-sm text-gray-500">{tx.date}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-800 font-semibold">
                  {tx.amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    tx.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {tx.status}
                </span>
                <button className="text-blue-500 hover:underline flex items-center">
                  View <CaretRight size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
