import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import AchievementSection from "../components/AchievementSection";
import EquipmentSection from "../components/EquipmentSection";
import FeaturedEventSection from "../components/FeaturedEventSection";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <>
      <main className=" min-h-screen flex-grow">
        <HeroSection />
        <FeaturedEventSection />
        <EquipmentSection />
        <AchievementSection />
      </main>
    </>
  );
};

export default HomePage;
