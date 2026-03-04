import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TourDetails from './pages/TourDetails/TourDetails';
import CategoryPage from './pages/CategoryPage/CategoryPage'; // 👈 thêm dòng này
import './App.css';
import BookingPage from './pages/BookingPage/BookingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/category/:destination" element={<CategoryPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;