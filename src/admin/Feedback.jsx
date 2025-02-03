import { useState } from 'react'

function Feedback() {
  // Mock data
  const [feedbacks] = useState([
    {
      id: 1,
      student: 'John Doe',
      date: '2024-03-15',
      message: 'Great facilities and equipment. The basketball court is well maintained.',
      rating: 5
    },
    {
      id: 2,
      student: 'Jane Smith',
      date: '2024-03-14',
      message: 'The tennis equipment could use some maintenance.',
      rating: 3
    }
  ])

  return (
    <div className="content-area">
      <h1 className="page-title">Student Feedback</h1>
      
      <div className="grid gap-6">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feedback.student}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(feedback.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < feedback.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedback