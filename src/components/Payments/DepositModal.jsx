import { useState } from "react";
import { createPaymentLinkApi } from "../../services/Payments/createPaymentLinkApi";

export default function DepositModal({ onClose }) {
  const [usd, setUsd] = useState("");
  const [loading, setLoading] = useState(false);
  const exchangeRate = 26304; // 1 USD = 26,304 VND

  const quickValues = [0.1, 10, 50, 100, 200, 500, 1000];

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, ""); // cho phép số thập phân
    setUsd(value);
  };

  const vndAmount = usd ? Math.round(parseFloat(usd) * exchangeRate) : 0;

  const handleProceed = async () => {
    if (!usd || parseFloat(usd) < 0.1) {
      alert("Minimum deposit is 0.1 USD.");
      return;
    }

    try {
      setLoading(true);

      const res = await createPaymentLinkApi({
        description: "Nạp tiền vào tài khoản",
        amount: vndAmount,
      });

      if (res) {
        window.location.href = res; // chuyển tới payment link
      } else {
        alert("Không tạo được liên kết thanh toán.");
      }
    } catch (error) {
      console.error("Create payment link error:", error);
      alert("Lỗi khi tạo liên kết thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-gray-800">Travel Buddy</h2>
            <p className="text-xs text-gray-500">Deposit limit: 0.1 - 10,000 USD</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Limits & Fee */}
        <div className="flex justify-between text-xs text-gray-600 mb-3">
          <p>0.1 - 10,000 USD</p>
          <p>
            Processing fee: <span className="text-green-600 font-semibold">Free</span>
          </p>
        </div>

        {/* Input USD */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Enter Amount (USD)
          </label>
          <input
            type="text"
            value={usd}
            onChange={handleChange}
            placeholder="Enter USD..."
            className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-300"
          />
          <p className="text-blue-600 font-semibold mt-2 text-sm">
            = {vndAmount.toLocaleString()} VND
          </p>
          <p className="text-xs text-gray-500">
            Exchange rate: 1 USD = {exchangeRate.toLocaleString()} VND
          </p>
        </div>

        {/* Quick select */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {quickValues.map((val) => (
            <button
              key={val}
              onClick={() => setUsd(val.toString())}
              className={`border rounded py-1.5 text-xs ${
                parseFloat(usd) === val
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {val} USD
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="mb-3">
          <p className="text-gray-700 text-sm">
            You will receive:{" "}
            <span className="font-semibold">{vndAmount.toLocaleString()} VND</span>
          </p>
        </div>

        {/* Bank */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1 text-sm">Select Bank</label>
          <select className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-blue-300">
            <option>VietQR</option>
          </select>
        </div>

        {/* Warning */}
        <p className="text-xs text-red-500 mb-3">
          Reminder: For safety reasons, each transaction should not exceed 350,000,000 VND.
        </p>

        {/* Submit */}
        <button
          onClick={handleProceed}
          disabled={loading}
          className={`w-full py-2.5 text-white text-sm font-semibold rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Proceed"}
        </button>
      </div>
    </div>
  );
}
