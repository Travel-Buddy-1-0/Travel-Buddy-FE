import { useState } from "react";
import {
  ChatCircleDots,
  X,
  ArrowsOutSimple,
  ArrowsInSimple,
  Microphone,
  PaperPlane,
  CaretRight ,
} from "phosphor-react";
import AvatarBuddy from "../../assets/AvatarBuddy.jpg"
export default function ChatAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAiChat, setIsAiChat] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsAiChat(false); // reset về menu gốc khi mở lại
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const loadFaqTitles = () => {
    setIsAiChat("faq");
  };

  const startAiChat = () => {
    setIsAiChat("ai");
  };

  return (
    <>
      {/* Nút mở chat */}
      <button
        onClick={toggleChat}
        className="w-[60px] h-[60px] fixed bottom-4 right-4 z-50 rounded-full bg-blue-400 shadow-xl hover:bg-blue-700 flex items-center justify-center"
      >
        {isOpen ? (
          <X size={20} weight="bold" color="white" />
        ) : (
          <ChatCircleDots size={20} weight="bold" color="white" />
        )}
      </button>

      {/* Chat box */}
      <div
        className={`fixed bottom-24 right-4 rounded shadow-lg z-200 flex flex-col bg-white transition-all duration-300 ease-out overflow-hidden
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-0 pointer-events-none"}
          ${isZoomed ? "w-2/5" : "w-2/7"}
          h-[calc(100vh-150px)] origin-bottom-right`}
      >
        {/* Header */}
        <div className="bg-[#00BCD4] text-white px-4 py-3 font-semibold flex justify-between  items-center">
          Travel Buddy AI
          <div className="flex space-x-2">
            <button onClick={toggleZoom} className="text-white">
              {isZoomed ? (
                <ArrowsInSimple size={16} weight="bold" />
              ) : (
                <ArrowsOutSimple size={16} weight="bold" />
              )}
            </button>
            <button onClick={toggleChat} className="text-white">
              <X size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Nội dung */}
        <div
          id="faqContainer"
          className="flex-1 overflow-y-auto p-4 text-sm bg-white space-y-2"
        >
          {isAiChat === false && (
            <div className="text-center text-black flex flex-col items-center justify-center mb-6 mt-6">
              <div className="font-extrabold text-2xl flex items-center">
                <img src={AvatarBuddy} className="w-26" />
              </div>
              <div className="text-gray-600 mt-1 mb-6 font-semibold">
                👋 How Buddy AI can help you?
              </div>

              <div className="flex flex-col items-center  mt-4 w-full">
                <button
                  onClick={loadFaqTitles}
                  className="group flex items-center justify-between bg-[#00BCD4] mb-6 hover:bg-[#00ACC1] rounded-lg px-4 py-3 shadow-md text-white cursor-pointer w-full max-w-lg transition-all"
                >
                  <span className="font-semibold text-sm">FAQ Questions</span>
                  <i className="fa-solid fa-chevron-right text-white"></i>
                </button>

                <button
                  onClick={startAiChat}
                  className="group flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-md hover:shadow-lg text-black cursor-pointer w-full transition-all max-w-lg  hover:text-purple-700"
                >
                  <span className="font-semibold text-sm">
                    Send message with AI
                  </span>
                  <i className="fa-solid fa-chevron-right text-indigo-600"></i>
                </button>
              </div>
            </div>
          )}

          {isAiChat === "faq" && (
            <p className="text-gray-600">👉 Đây là danh sách FAQ (demo)</p>
          )}

          {isAiChat === "ai" && (
            <p className="text-gray-600">💬 Bắt đầu chat với AI (demo)</p>
          )}
        </div>

        {/* Input chat */}
        {isAiChat === "ai" && (
          <div className="bg-[#00BCD4]">
            <div className="bg-white flex mx-[5%] my-3 items-center px-3 py-1 border-2 border-gray-400 rounded-3xl transition-all duration-200 focus-within:border-indigo-500 hover:border-indigo-500 group">
              <input
                id="chatInput"
                type="text"
                placeholder="Message..."
                className="flex-grow bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none ml-2"
              />
              <button className="ml-2 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-indigo-500 transition-all">
                <Microphone
                  size={18}
                  className="text-gray-600 group-hover:text-white"
                />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-indigo-500 transition-all">
                <CaretRight  
                  size={18}
                  className="text-gray-600 group-hover:text-white"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
