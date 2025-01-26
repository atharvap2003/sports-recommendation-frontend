import React, { useState } from 'react';

const Equipment = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentRequests] = useState([
    {
      id: 1,
      item: 'Basketball',
      requestedBy: 'John Doe',
      status: 'Pending',
      quantity: 5,
    },
    {
      id: 2,
      item: 'Tennis Racket',
      requestedBy: 'Jane Smith',
      status: 'Approved',
      quantity: 2,
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 3,
      item: `Equipment ${i + 3}`,
      requestedBy: `User ${i + 3}`,
      status: i % 2 === 0 ? 'Pending' : 'Approved',
      quantity: Math.floor(Math.random() * 5) + 1,
    }))
  ]);

  const [inventory] = useState([
    { id: 1, item: 'Basketball', available: 15, total: 20 },
    { id: 2, item: 'Tennis Racket', available: 8, total: 10 },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 3,
      item: `Equipment ${i + 3}`,
      available: Math.floor(Math.random() * 20) + 5,
      total: 25,
    }))
  ]);

  const filteredRequests = equipmentRequests.filter(request =>
    request.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = inventory.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full grid grid-rows-2 gap-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-800">Equipment Requests</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <table className="min-w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{request.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.requestedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="text-green-600 hover:text-green-900">
                      Approve
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-800">Equipment Inventory</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
          >
            Add New Equipment
          </button>
        </div>

        {showAddForm && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl w-96 z-50">
            <h3 className="text-lg font-semibold mb-4 text-green-800">Add New Equipment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Equipment Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Quantity</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-xl font-medium hover:from-green-700 hover:to-green-800"
                >
                  Add Equipment
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <table className="min-w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.available < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.available}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="text-green-600 hover:text-green-900">
                      Update
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
