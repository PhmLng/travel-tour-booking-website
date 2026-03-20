import React, { useState, useEffect } from 'react';
import './HeroBanner.css';
import SearchSection from '../SearchSection/SearchSection';

// ── Thêm tên file ảnh của bạn vào đây ──
const SLIDES = [
  '/tours/banner.jpg',
  '/tours/tour6.jpg',
  '/tours/tour4.jpg',
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="hero-banner"
      style={{ backgroundImage: `url('${SLIDES[current]}')` }}
    >
      {/* Dots */}
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <SearchSection />
    </section>
  );
};

export default HeroBanner;