import React from "react";
import { Play, Award, Users } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { icon: Users, label: "Active Athletes", value: "500+" },
    { icon: Award, label: "Championships", value: "25+" },
    { icon: Play, label: "Sports", value: "15+" },
  ];

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 to-purple-900/80 backdrop-blur-sm"></div>
        </div>

        {/* Content */}
        <div className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto w-full pt-20 pb-16 text-center mt-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="block mt-10">Unleash Your Potential at</span>
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent py-4">
                Sinhgad College of Engineering
              </span>
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-indigo-200 max-w-3xl mx-auto">
              Where Champions Are Made. Join Our Elite Sports Program.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/events" rel="noopener noreferrer">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Explore Events
                </button>
              </a>
              <a href="/login" rel="noopener noreferrer">
                <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                  Create Account
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300"
                >
                  <Icon className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">
                    {value}
                  </div>
                  <div className="text-indigo-200">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
