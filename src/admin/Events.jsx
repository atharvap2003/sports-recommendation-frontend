import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Events() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    contact: '',
    description: '',
    rules: '',
    prizes: '',
    sportsCategory: ''
  })
  
  // Mock data
  const events = [
    {
      id: 1,
      title: 'Inter-College Basketball Tournament',
      date: '2024-04-15',
      location: 'Main Sports Complex',
      participants: [
        { name: 'John Doe', mobile: '+1 234-567-8900', email: 'john@example.com' },
        { name: 'Jane Smith', mobile: '+1 234-567-8901', email: 'jane@example.com' },
      ]
    },
    {
      id: 2,
      title: 'Annual Sports Day',
      date: '2024-05-01',
      location: 'College Ground',
      participants: [
        { name: 'Mike Johnson', mobile: '+1 234-567-8902', email: 'mike@example.com' },
        { name: 'Sarah Wilson', mobile: '+1 234-567-8903', email: 'sarah@example.com' },
      ]
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    setShowForm(false)
    setFormData({
      title: '',
      startDate: '',
      endDate: '',
      location: '',
      organizer: '',
      contact: '',
      description: '',
      rules: '',
      prizes: '',
      sportsCategory: ''
    })
  }

  return (
    <div className="content-area">
      <h1 className="page-title">Events Management</h1>
      
      <div className="mb-6">
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create New Event
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input-search"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input-search"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input-search"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-search"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sports Category</label>
                <select
                  name="sportsCategory"
                  value={formData.sportsCategory}
                  onChange={handleInputChange}
                  className="input-search"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="basketball">Basketball</option>
                  <option value="football">Football</option>
                  <option value="cricket">Cricket</option>
                  <option value="tennis">Tennis</option>
                  <option value="athletics">Athletics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className="input-search"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="input-search"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-search"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rules</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  className="input-search"
                  rows="3"
                  required
                  placeholder="Enter each rule on a new line"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prizes</label>
                <textarea
                  name="prizes"
                  value={formData.prizes}
                  onChange={handleInputChange}
                  className="input-search"
                  rows="3"
                  required
                  placeholder="Enter prize details"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {events.map(event => (
          <div
            key={event.id}
            className="card hover:shadow-lg cursor-pointer transition-shadow"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {event.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Participants:</span> {event.participants.length}
                  </p>
                </div>
              </div>
              <span className="text-blue-600 dark:text-blue-400">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events