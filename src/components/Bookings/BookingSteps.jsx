export default function BookingSteps({ currentStep = 3 }) {
  const steps = [
    { id: 1, label: "Bạn chọn" },
    { id: 2, label: "Chi tiết về bạn" },
    { id: 3, label: "Hoàn tất đặt phòng" },
  ];

  return (
    <div className="flex  text-center items-center w-ful mx-auto my-8 ml-[200px]">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center flex-1">
          {/* Circle */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${
                currentStep > step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : currentStep === step.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-400 text-gray-500"
              }`}
          >
            {currentStep > step.id ? "✓" : step.id}
          </div>

          {/* Label */}
          <div
            className={`ml-2 font-medium ${
              currentStep === step.id ? "text-black" : "text-gray-500"
            }`}
          >
            {step.label}
          </div>

          {/* Line nối giữa các bước */}
          {idx < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] mx-4 ${
                currentStep > step.id || currentStep === steps.length
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
