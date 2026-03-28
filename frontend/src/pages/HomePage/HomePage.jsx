import React from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import FlashDeals from '../../components/FlashDeals/FlashDeals';

import Footer from '../../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroBanner />
      {/* <SearchSection /> */}
      <FlashDeals />
      {/* <PopularDestinations /> */}
      {/* <BestCombos /> */}
      <Footer />
    </div>
  );
};

export default HomePage;