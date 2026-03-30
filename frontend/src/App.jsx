import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import TourDetails from "./pages/TourDetails/TourDetails";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import BookingHistoryPage from "./pages/BookingHistoryPage/BookingHistoryPage";
import RemainingPaymentPage from "./pages/RemainingPayment/RemainingPaymentPage";

import { ContactPage } from "./pages/ContactPage";
import Dashboard from "./pages/DashBoard";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

// Dashboard components
import { BookingManage } from "./components/DashBoardPage/BookingManage/BookingManage";
import { Customer } from "./components/DashBoardPage/Customer/Customer";
import { ContentDashBoard } from "./components/DashBoardPage/DashBoardContent/ContentDashBoard";
import { TourManage } from "./components/DashBoardPage/TourMangager/TourManage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <Toaster richColors />
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

          {/* Booking */}
          <Route path="/booking-history" element={<BookingHistoryPage />} />
          <Route
            path="/bookings/:bookingId/payment"
            element={<RemainingPaymentPage />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="contentDashboard" replace />} />
            <Route path="contentDashboard" element={<ContentDashBoard />} />
            <Route path="tours" element={<TourManage />} />
            <Route path="customers" element={<Customer />} />
            <Route path="bookings" element={<BookingManage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
