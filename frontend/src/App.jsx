import { BookingManage } from "./components/DashBoardPage/BookingManage/BookingManage";
import { Customer } from "./components/DashBoardPage/Customer/Customer";
import { ContentDashBoard } from "./components/DashBoardPage/DashBoardContent/ContentDashBoard";
import { TourManage } from "./components/DashBoardPage/TourMangager/TourManage";
import { ContactPage } from "./pages/ContactPage";
import Dashboard from "./pages/DashBoard";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* {public routes} */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />

          {/* {protected routes} */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
          <Route path="contentDashboard" element={<ContentDashBoard />} />
          <Route path="tours" element={<TourManage />} />
          <Route path="customers" element={<Customer />} />
          <Route path="bookings" element={<BookingManage />} />
</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
