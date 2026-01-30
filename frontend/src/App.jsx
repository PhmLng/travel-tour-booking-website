import Header from "./components/Header/Header.jsx"; // hoặc .js nếu VS Code nhận
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TourCard from "./components/TourCard/TourCard.jsx"

function App() {
  return (
    <>
      <Header />  {/* Header hiển thị trên tất cả page */}
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
