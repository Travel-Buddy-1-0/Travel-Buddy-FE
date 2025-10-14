import { useState, useEffect } from "react";
import { MagnifyingGlass, Calendar } from "phosphor-react";
import { getPaymentHistory } from "../../services/Payments/getPaymentHistory";

export default function MyCard() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) return;
    getPaymentHistory().then((data) => {
      setTransactions(data);
      setFiltered(data);
    });
  }, [userId]);

  const handleSearch = () => {
    let result = [...transactions];
    if (startDate) result = result.filter((tx) => new Date(tx.createdAt) >= new Date(startDate));
    if (endDate) result = result.filter((tx) => new Date(tx.createdAt) <= new Date(endDate));
    if (statusFilter !== "ALL") result = result.filter((tx) => tx.status === statusFilter);
    setFiltered(result);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
         Lịch sử giao dịch
      </h2>

      {/* Bộ lọc */}
      <div className="flex justify-between flex-wrap items-end gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex space-x-8">
              <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Calendar size={16} /> Thời gian bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Calendar size={16} /> Thời gian kết thúc
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          >
            <option value="ALL">Tất cả</option>
            <option value="PAID">Thành công</option>
            <option value="PENDING">Đang chờ</option>
          </select>
        </div>
        </div>
    

        <button
          onClick={handleSearch}
          className="flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-all"
        >
          <MagnifyingGlass size={18} />
          Tìm kiếm
        </button>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Thời gian đăng ký</th>
              <th className="px-4 py-3 text-left">Phương thức</th>
              <th className="px-4 py-3 text-right">Số tiền</th>
              <th className="px-4 py-3 text-left">Mã giao dịch</th>
              <th className="px-4 py-3 text-left">Ghi chú</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  Không có giao dịch nào phù hợp
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr
                  key={tx.paymentId}
                  className="border-t border-gray-300  hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-800">
                      {new Date(tx.createdAt).toLocaleTimeString("vi-VN")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                  </td>
                  <td className="px-4 py-3">{tx.paymentMethod || "—"}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    {tx.amount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: tx.currency || "VND",
                    })}
                  </td>
                  <td className="px-4 py-3 truncate max-w-[130px]">{tx.transactionCode}</td>
                  <td className="px-4 py-3 text-gray-600">{tx.description || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`  rounded-full text-xs font-semibold ${
                        tx.status === "PAID"
                          ? "  text-green-700 "
                          : " text-yellow-700  "
                      }`}
                    >
                      {tx.status === "PAID" ? "Thành công" : "Đang chờ"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
