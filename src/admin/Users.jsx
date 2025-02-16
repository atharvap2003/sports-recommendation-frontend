import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTrash } from "react-icons/fa";

function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    user_type: "",
    department: "",
    year: "",
  });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters,
      }).toString();

      const response = await fetch(
        `http://localhost:5000/api/admin/users/getAllUsers?${queryParams}`
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("No User Found!!");
      }

      const data = await response.json();
      console.log(data);
      
      setUsers(data.users);
      setTotalPages(data.pagination.totalPages);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when page, limit, or filters change
  useEffect(() => {
    fetchUsers();
  }, [page, limit, filters]);

  // Handle search
  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete
  const handleDelete = async (e, userId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/deleteUser/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        fetchUsers(); // Refresh the user list after deletion
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Handle user click
  const handleUserClick = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="content-area">
      <h1 className="page-title">Users Management</h1>

      <div className="card">
        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="       Search users..."
            className="input-search pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            name="user_type"
            value={filters.user_type}
            onChange={handleFilterChange}
            className="input-filter p-2 cursor-pointer"
          >
            <option value="">All User Types</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="input-filter p-2 cursor-pointer"
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="CS">CS</option>
            <option value="EnTC">EnTC</option>
            <option value="Mech">Mech</option>
            <option value="Biotech">Biotech</option>
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
          </select>

          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="input-filter p-2 cursor-pointer"
          >
            <option value="">All Years</option>
            <option value="FE">FE</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Users Table */}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">
                      Mobile Number
                    </th>
                    <th className="px-6 py-3 text-left text-gray-500 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                        {user.fullname}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                        {user.mobile_number}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => handleDelete(e, user._id)} // Pass user.id correctly
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

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
