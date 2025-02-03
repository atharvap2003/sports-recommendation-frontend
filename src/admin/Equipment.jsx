import { useState } from 'react'
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa'

function Equipment() {
  // Mock data
  const [requests, setRequests] = useState([
    { id: 1, student: 'John Doe', item: 'Basketball', status: 'pending' },
    { id: 2, student: 'Jane Smith', item: 'Tennis Racket', status: 'approved' },
  ])

  const [inventory, setInventory] = useState([
    { item: 'Basketball', available: 5 },
    { item: 'Football', available: 8 },
    { item: 'Tennis Racket', available: 3 },
  ])

  const [editingItem, setEditingItem] = useState(null)
  const [editValue, setEditValue] = useState('')

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ))
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setEditValue(item.available.toString())
  }

  const handleSave = () => {
    const newValue = parseInt(editValue)
    if (!isNaN(newValue) && newValue >= 0) {
      setInventory(inventory.map(item =>
        item.item === editingItem.item
          ? { ...item, available: newValue }
          : item
      ))
    }
    setEditingItem(null)
  }

  return (
    <div className="content-area">
      <h1 className="page-title">Equipment Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Equipment Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">Student</th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">Item</th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">Status</th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {requests.map(request => (
                  <tr key={request.id}>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{request.student}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{request.item}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        request.status === 'approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(request.id, 'approved')}
                            className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Inventory</h2>
          <div className="space-y-4">
            {inventory.map(item => (
              <div key={item.item} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-800 dark:text-gray-300">{item.item}</span>
                {editingItem?.item === item.item ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 px-2 py-1 rounded border dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      min="0"
                    />
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                      Available: {item.available}
                    </span>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equipment