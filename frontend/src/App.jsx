import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from "./pages/HomePage/HomePage";
import TourDetails from './pages/TourDetails/TourDetails';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import BookingPage from './pages/BookingPage/BookingPage';
import AdminDashboard from './pages/admin';

import { ContactPage } from "./pages/ContactPage";
import Dashboard from "./pages/DashBoard";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* Auth */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Main pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Tour pages */}
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/category/:destination" element={<CategoryPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />

          {/* Dashboard */}
          <Route path="/dashboard/*" element={<Dashboard />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;