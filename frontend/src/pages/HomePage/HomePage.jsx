import React from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import SearchSection from '../../components/SearchSection/SearchSection';
import FlashDeals from '../../components/FlashDeals/FlashDeals';
import PopularDestinations from '../../components/PopularDestinations/PopularDestinations';
import BestCombos from '../../components/BestCombos/BestCombos';
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