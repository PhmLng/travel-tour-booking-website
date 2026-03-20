import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const TourGallery = ({ images, currentImageIndex, onPrev, onNext, onSelect, title }) => (
  <div className="tour-gallery">
    <div className="main-image">
      <img
        src={images[currentImageIndex]?.imageUrl || "/no-image.jpg"}
        alt={`${title} - ${currentImageIndex + 1}`}
        onError={(e) => { e.target.src = "/no-image.jpg"; }}
      />
      {images.length > 1 && (
        <>
          <button className="gallery-nav prev" onClick={onPrev}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="gallery-nav next" onClick={onNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </>
      )}
    </div>
    {images.length > 1 && (
      <div className="thumbnail-grid">
        {images.slice(0, 4).map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${currentImageIndex === index ? "active" : ""}`}
            onClick={() => onSelect(index)}
          >
            <img
              src={`${img.imageUrl}?auto=format&fit=crop&w=800&q=80`}
              alt={`Thumbnail ${index + 1}`}
            />
            {index === 3 && images.length > 4 && (
              <div className="more-images">+{images.length - 4}</div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default TourGallery;
