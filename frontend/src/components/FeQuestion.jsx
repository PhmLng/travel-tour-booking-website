import React from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Làm thế nào để đặt hàng?",
    answer:
      "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
  },
  {
    question: "Tôi có thể thanh toán bằng những cách nào?",
    answer:
      "You can pay using credit card, PayPal, or bank transfer depending on your region.",
  },
  {
    question: "Mất bao lâu để tôi nhận được đơn hàng?",
    answer:
      "Delivery usually takes 3–7 business days depending on your location.",
  },
  {
    question: "Tôi có thể bán lại các sản phẩm không?",
    answer: "Yes, but you must follow our reseller guidelines and policies.",
  },
  {
    question: "Tôi có thể xem thông tin vận chuyển ở đâu?",
    answer:
      "Shipping details are available in your account dashboard under Orders.",
  },
];

export const FeQuestion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return;
  <div></div>;
};
