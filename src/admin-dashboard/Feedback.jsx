import React, { useState } from 'react';

const Feedback = () => {
  const [feedback] = useState([
    {
      id: 1,
      user: 'John Doe',
      message: 'Great facilities and excellent coaching staff!',
      date: '2024-03-15',
      rating: 5,
    },
    {
      id: 2,
      user: 'Jane Smith',
      message: 'The equipment could use some maintenance.',
      date: '2024-03-14',
      rating: 3,
    },
  ]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
      <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{item.user}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < item.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700">{item.message}</p>
            <div className="mt-3 flex justify-end space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                Reply
              </button>
              <button className="text-red-600 hover:text-red-900 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;