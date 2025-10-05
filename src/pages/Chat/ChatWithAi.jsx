import { useState } from "react";
import { Microphone, CaretRight } from "phosphor-react";

export default function ChatWithAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    // gọi API AI (demo)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Buddy AI đang xử lý yêu cầu của bạn..." },
      ]);
    }, 800);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg text-sm max-w-[85%] ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-gray-100 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* input box */}
      <div className="bg-[#00BCD4]">
        <div className="bg-white flex mx-[5%] my-3 items-center px-3 py-1 border-2 border-gray-400 rounded-3xl transition-all duration-200 focus-within:border-indigo-500 hover:border-indigo-500 group">
          <input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none ml-2"
          />
          <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-indigo-500 transition-all">
            <Microphone
              size={18}
              className="text-gray-600 group-hover:text-white"
            />
          </button>
          <button
            onClick={handleSend}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-indigo-500 transition-all"
          >
            <CaretRight size={18} className="text-gray-600 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
