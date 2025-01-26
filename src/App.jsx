import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import EquipmentPage from "./pages/EquipmentPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AchievementPage from "./pages/AchievementsPage";
import ProfileCreationPage from "./pages/ProfileCreationPage";
import AdminHomePage from "./admin-dashboard/AdminHomePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AppContent = () => {
  const location = useLocation();

  // Conditionally hide Navbar and Footer on login and register pages
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/create-profile" || location.pathname === "/admin-dashboard";

  return (
    <>
      {/* Only show Navbar and Footer if not on login or register page */}
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-profile" element={<ProfileCreationPage/>}/>
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/equipment-list" element={<EquipmentPage />} />
        <Route path="/achievements" element={<AchievementPage />} />
        <Route path="/admin-dashboard" element={<AdminHomePage />} />
      </Routes>
      {/* Only show Footer if not on login or register page */}
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
