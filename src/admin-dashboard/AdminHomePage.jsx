import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Users from './Users';
import Events from './Events';
import Equipment from './Equipment';
import Feedback from './Feedback';

const AdminHomePage = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <Users />;
      case 'events':
        return <Events />;
      case 'equipment':
        return <Equipment />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminHomePage;
