import React, { useState } from 'react';
import { Search, Filter, Dumbbell } from 'lucide-react';

const equipmentList = [
  {
    id: 1,
    name: 'Basketball',
    category: 'Team Sports',
    total: 20,
    available: 15,
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1733481278677-c381d277a4b1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    name: 'Cricket Kit',
    category: 'Team Sports',
    total: 10,
    available: 8,
    condition: 'Good',
    image: 'https://plus.unsplash.com/premium_photo-1722351690086-b42310f14c14?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    name: 'Tennis Racket',
    category: 'Individual Sports',
    total: 15,
    available: 12,
    condition: 'Excellent',
    image: 'https://media.istockphoto.com/id/1184203343/photo/close-up-of-black-modern-rackets-with-light-green-ball-lying-on-tennis-court-floor-sport-and.jpg?s=2048x2048&w=is&k=20&c=WlXMJiWmAZkb-RB-uG4H0a4Cp-MQcUOjKln73Uoy6aQ='
  },
  {
    id: 4,
    name: 'Football',
    category: 'Team Sports',
    total: 25,
    available: 20,
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    name: 'Cricket Ball',
    category: 'Team Sports',
    total: 25,
    available: 20,
    condition: 'Good',
    image: 'https://media.istockphoto.com/id/157441568/photo/new-cricket-ball.jpg?s=2048x2048&w=is&k=20&c=cycGZweA3HzmRMIcdZBUtOxfAp0aYrcGP4J0Uwln1z4='
  },
  {
    id: 6,
    name: 'Cricket Ball',
    category: 'Team Sports',
    total: 25,
    available: 20,
    condition: 'Good',
    image: 'https://plus.unsplash.com/premium_photo-1679917506577-6c986f6faab6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q3JpY2tldCUyMGJhdHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 7,
    name: 'Vollyball',
    category: 'Team Sports',
    total: 25,
    available: 20,
    condition: 'Good',
    image: 'https://media.istockphoto.com/id/1929880938/photo/volleyball.webp?s=2048x2048&w=is&k=20&c=oVoGG4jJk-lPigKjzc2p2EFjL9v_9PMGC484DYPFzdM='
  },
  {
    id: 6,
    name: 'Basketball',
    category: 'Team Sports',
    total: 25,
    available: 20,
    condition: 'Good',
    image: 'https://media.istockphoto.com/id/1636022764/photo/basketball-ball.webp?s=2048x2048&w=is&k=20&c=-OfPLc9FOl9Jehwrs3Ldvj5xBk3ttfNXY1-nHSbHhTk='
  },
  
  
];

const EquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    purpose: '',
    duration: '',
    quantity: 1
  });

  const categories = ['All', 'Team Sports', 'Individual Sports'];

  const filteredEquipment = equipmentList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRequest = (equipment) => {
    setSelectedEquipment(equipment);
    setShowRequestForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ equipment: selectedEquipment, ...formData });
    setShowRequestForm(false);
    setFormData({ studentId: '', purpose: '', duration: '', quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sports Equipment Management</h1>
          <p className="text-xl text-gray-600">Browse and request equipment for your training</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((equipment) => (
            <div key={equipment.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={equipment.image} 
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{equipment.name}</h3>
                    <p className="text-gray-600">{equipment.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    equipment.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {equipment.available > 0 ? 'Available' : 'Out of Stock'}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Units:</span>
                    <span>{equipment.total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Available:</span>
                    <span>{equipment.available}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Condition:</span>
                    <span>{equipment.condition}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRequest(equipment)}
                  disabled={equipment.available === 0}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    equipment.available > 0
                      ? 'bg-indigo-900 hover:bg-indigo-950 text-white'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  Request Equipment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Request Form Modal */}
        {showRequestForm && selectedEquipment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6">Request {selectedEquipment.name}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Purpose</label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Duration (days)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    min="1"
                    max={selectedEquipment.available}
                    required
                  />
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentPage;