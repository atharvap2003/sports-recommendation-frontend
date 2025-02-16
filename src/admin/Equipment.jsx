import { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaEdit, FaPlus } from "react-icons/fa";

import InventorySection from "./admin-components/InventorySection";

function Equipment() {
  // Dummy equipment requests (not integrated with backend)
  const [requests, setRequests] = useState([
    { id: 1, student: "John Doe", item: "Basketball", status: "pending" },
    { id: 2, student: "Jane Smith", item: "Tennis Racket", status: "approved" },
  ]);

  // Inventory state will be fetched from the backend
  const [inventory, setInventory] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(false);
  const [inventoryError, setInventoryError] = useState(null);

  // New state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Editing state for modifying available quantity
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Modal visibility and form state for adding equipment
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    item: "",
    available: "",
    total: "",
  });

  // Fetch inventory from backend GET endpoint.
  // (Make sure your backend has a corresponding GET route such as "/api/admin/equipment")
  const fetchInventory = async () => {
    try {
      setLoadingInventory(true);
      const response = await fetch("http://localhost:5000/api/admin/equipment");
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const result = await response.json();
      // Check if the response contains the array inside a property (e.g., result.data)
      const equipments = Array.isArray(result) ? result : result.data;
      if (!Array.isArray(equipments)) {
        throw new Error("Unexpected response format");
      }
      const mappedInventory = equipments.map((equip) => ({
        item: equip.equipmentname,
        available: equip.availableQuantity,
        total: equip.TotalQuantity,
      }));
      setInventory(mappedInventory);
      setInventoryError(null);
    } catch (error) {
      setInventoryError(error.message);
    } finally {
      setLoadingInventory(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };




  return (
    <div className="content-area relative">
      <h1 className="page-title">Equipment Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[62%_33%] gap-6 items-start">
        {/* Equipment Requests Section */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Equipment Requests
          </h2>
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
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{request.student}</td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{request.item}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : request.status === "rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {request.status === "pending" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(request.id, "approved")}
                            className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, "rejected")}
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

        <InventorySection />
      </div>
    </div>
  );
}

export default Equipment;
