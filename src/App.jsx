import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import EquipmentPage from "./pages/EquipmentPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AchievementPage from "./pages/AchievementsPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/events" element={<EventsPage/>} />
          <Route path="/events/:id" element={<EventDetailPage/>} />
          <Route path="/equipment-list" element={<EquipmentPage/>}/>
          <Route path="/achievements" element={<AchievementPage/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
