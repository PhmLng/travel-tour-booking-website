import React from "react";

const CategoryHero = ({ info, decodedDest }) => (
  <div className="category-hero">
    <div className="container">
      <div className="breadcrumb">
        <a href="/">Điểm đến</a>
        <span>/</span>
        <a href="#">{info.breadcrumb}</a>
        <span>/</span>
        <span className="current">{decodedDest}</span>
      </div>

      <h1 className="category-title">{info.title}</h1>
      <p className="category-desc">{info.description}</p>

      {info.highlights.length > 0 && (
        <p className="category-highlights">
          Đăng ký tour <strong>{decodedDest}</strong> cùng chúng tôi, quý khách có thể đến khám phá:{" "}
          {info.highlights.map((h, i) => (
            <span key={h}>
              <a href="#" className="highlight-link">{h}</a>
              {i < info.highlights.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}
    </div>
  </div>
);

export default CategoryHero;
