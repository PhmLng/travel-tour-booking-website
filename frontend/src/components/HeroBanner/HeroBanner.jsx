import React from 'react';
import './HeroBanner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import SearchSection from '../SearchSection/SearchSection';


const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="banner-container">
        <div className="banner-main">
          <h1 className="banner-title">Tết Rực Rỡ</h1>
          <p className="banner-subtitle">Rộn ràng vui - Rộn hạnh phúc</p>
        </div>

        <div className="banner-contact">
          <span className="contact-icon">
            <FontAwesomeIcon icon={faPhone} />
          </span>
          <span className="contact-number">1800 646 888</span>
          <span className="contact-separator">|</span>
          <span className="contact-website">travel.com</span>
        </div>
      </div>
      <SearchSection />
    </section>
  );
};

export default HeroBanner;
