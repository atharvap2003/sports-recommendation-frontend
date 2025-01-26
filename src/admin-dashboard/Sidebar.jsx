import React from 'react';
import { Users, Calendar, Dumbbell, MessageSquare } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'equipment', label: 'Equipment', icon: <Dumbbell size={20} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-green-600 to-green-700 h-screen p-4 flex flex-col">
      <div className="text-white text-2xl font-bold p-4 mr-18 mb-12">
        Sports Admin
      </div>
      <nav className="flex-1 flex flex-col justify-center space-y-2 items-center">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-white text-green-700 shadow-lg transform scale-105'
                : 'text-white hover:bg-white/10 text-center'
            }`}
          >
            {item.icon}
            <span className="font-medium text-center flex items-center justify-center" >{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
