import { testimonials } from "@/lib/data";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Stars = ({ rating }) => {
  return (
    <div className="flex justify-center mt-2">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-400"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const TestimonialsCard = ({ item, isActive }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`relative w-full max-w-sm p-8 pt-16 text-center shadow-xl rounded-2xl min-h-90
  transition-all duration-700 ease-in-out
  ${
    isActive
      ? "scale-110 bg-white z-10 translate-x-0"
      : "scale-90 opacity-50 bg-muted"
  }`}
    >
      <img
        src={item.avatar}
        className="absolute object-cover w-20 h-20 -translate-x-1/2 border-4 rounded-full shadow-lg border-muted md:w-24 md:h-24 -top-10 left-1/2"
      />

      <h3 className="text-xl font-bold md:text-2xl">{item.name}</h3>
      <p className="text-primary">{item.username}</p>

      <p
        className={`mt-4 text-muted-foreground transition-all duration-300 ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {item.content}
      </p>
      {item.content.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="hidden mt-2 text-sm font-medium text-primary hover:underline lg:inline-block"
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}

      <Stars rating={item.rating} />
    </div>
  );
};

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const getVisible = () => {
    const prev = (current - 1 + testimonials.length) % testimonials.length;
    const next = (current + 1) % testimonials.length;

    return [testimonials[prev], testimonials[current], testimonials[next]];
  };

  const visibleItems = getVisible();

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="flex flex-col items-center w-full gap-10 bg-[rgb(57,56,56)] bg-[url('./topography.svg')] rounded-4xl py-20">
      <div className="mb-8 text-center">
        <p className="text-4xl font-bold text-muted">Lạc Việt Travel</p>
        <h1 className="my-5 text-3xl font-bold text-muted">
          Một số đánh giá từ khách hàng
        </h1>
      </div>
      <div className="relative flex items-center justify-center w-full px-6 md:px-20">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-20 p-3 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:bg-gray-200"
        >
          <ChevronLeft />
        </button>
        <div className="flex items-center justify-center gap-6">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className={`${index !== 1 ? "hidden md:block" : "block"}`}
            >
              <TestimonialsCard item={item} isActive={index === 1} />
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 z-20 p-3 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:bg-gray-200"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="flex gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300
        ${index === current ? "bg-white scale-125" : "bg-gray-400 opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
};
