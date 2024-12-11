import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../public/assets/css/style.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Catering from "./pages/Catering";
import ProtectedRoutes from "./ProtectedRoutes";
import Cart from "./pages/Cart";
import ThankYouPage from "./pages/ThankYouPage";
import SetNewPassword from "./components/login_page_components/SetNewPassword";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* not token required path */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/set_new_password" element={<SetNewPassword />} />

        {/* token required path */}
        <Route
          path="/user_dashboard"
          element={
            <ProtectedRoutes>
              <UserDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/thank-you"
          element={
            <ProtectedRoutes>
              <ThankYouPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
