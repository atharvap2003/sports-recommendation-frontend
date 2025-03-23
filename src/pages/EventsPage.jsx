import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); // Filter for status
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/getevent");
        const data = await response.json();

        if (data.success) {
          const images = [
            "https://tiemdelhi.com/blogs/wp-content/uploads/2023/03/sports-1024x683.jpg",
            "https://img.freepik.com/free-vector/gradient-national-sports-day-illustration_23-2148995776.jpg",
          ];

          setEvents(
            data.events.map((event) => {
              const applyLastDate = new Date(event.applyLastDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Normalize time for accurate comparison

              return {
                id: event._id,
                title: event.title,
                description: event.description,
                date: `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`,
                registrationDeadline: applyLastDate.toLocaleDateString(),
                location: event.location,
                image: images[Math.floor(Math.random() * images.length)], // Random image selection
                status: applyLastDate >= today ? "Available" : "Closed", // Convert status to string
              };
            })
          );
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected status
  const filteredEvents = events.filter((event) => {
    if (selectedStatus === "All") return true;
    return event.status === selectedStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 mt-4">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Sports Events
            </h1>
            <p className="text-xl text-gray-600">
              Discover and register for upcoming sports events
            </p>
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-6 h-6 text-gray-600" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Events</option>
              <option value="Available">Available</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Event Status Tag */}
                <span
                  className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    event.status === "Available"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Deadline: {event.registrationDeadline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <Link
                  to={`/events/${event.id}`}
                  className="block w-full py-3 px-4 rounded-lg font-semibold text-center bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no events match filter */}
        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No events available under this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
