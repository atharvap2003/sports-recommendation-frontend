import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaTrash } from 'react-icons/fa'

function Users() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', sport: 'Basketball' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', sport: 'Football' },
  ])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (e, userId) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="content-area">
      <h1 className="page-title">Users Management</h1>
      
      <div className="card">
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="input-search pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Sport</th>
                <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{user.name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{user.sport}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => handleDelete(e, user.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users