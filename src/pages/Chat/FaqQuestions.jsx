// src/components/ChatAi/FaqQuestions.jsx
export default function FaqQuestions() {
  const faqs = [
    { question: "How to book a hotel?", answer: "You can book directly in the Hotel tab." },
    { question: "Can I cancel my booking?", answer: "Yes, you can cancel before check-in date." },
    { question: "How do I contact support?", answer: "Use the chat or send us an email." },
  ];

  return (
    <div className="p-4 space-y-3 text-sm text-gray-700">
      <h3 className="font-semibold text-lg text-[#00BCD4] mb-3">❓ Frequently Asked Questions</h3>
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm">
          <p className="font-semibold text-gray-900">{faq.question}</p>
          <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
