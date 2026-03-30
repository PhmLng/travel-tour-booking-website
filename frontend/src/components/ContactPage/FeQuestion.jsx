import React from "react";
import { useState } from "react";
import { faqs } from "@/lib/data";
import { Plus, Minus } from "lucide-react";

export const FeQuestion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="max-w-4xl px-6 py-16 mx-auto">
      <h2 className="mb-3 font-bold text-center md:text-4xl text-primary">
        Câu hỏi thường gặp
      </h2>
      <p className="mb-12 text-center text-muted-foreground">
        Nhiều người không trân trọng khoảnh khắc cho đến khi nó trôi qua.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="pb-4 border-b border-slate-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between w-full text-left"
            >
              <span
                className={`text-xl font-semibold ${openIndex === index ? "text-slate-700" : "text-slate-500"} `}
              >
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-slate-500" />
              ) : (
                <Plus className="w-5 h-5 text-slate-500" />
              )}
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden text-slate-500">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
