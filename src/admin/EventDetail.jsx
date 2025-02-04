import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data
  const event = {
    id: parseInt(id),
    title: "Inter-College Basketball Tournament",
    startDate: "2024-04-15",
    endDate: "2024-04-17",
    location: "Main Sports Complex",
    description:
      "Annual inter-college basketball tournament featuring teams from neighboring colleges.",
    organizer: "Sports Department",
    contact: "sports@college.edu",
    sportsCategory: "Basketball",
    rules: [
      "Teams must have 5-12 players",
      "All players must be current students",
      "Games will be 4 quarters of 10 minutes each",
      "Standard NBA rules apply",
    ],
    prizes: [
      "1st Place: $1000 + Trophy",
      "2nd Place: $500",
      "3rd Place: $250",
      "Best Player: Special Award",
    ],
    participants: [
      {
        name: "John Doe",
        mobile: "+1 234-567-8900",
        email: "john@example.com",
      },
      {
        name: "Jane Smith",
        mobile: "+1 234-567-8901",
        email: "jane@example.com",
      },
      {
        name: "Mike Johnson",
        mobile: "+1 234-567-8902",
        email: "mike@example.com",
      },
      {
        name: "Sarah Wilson",
        mobile: "+1 234-567-8903",
        email: "sarah@example.com",
      },
    ],
  };
  const handleNavigateToEvents = () => {
    navigate("/admin/events");
  };
  return (
    <div className="content-area">
      <button
        onClick={handleNavigateToEvents}
        className="flex items-center text-gray-600 dark:text-gray-300 mb-6 hover:text-gray-800 dark:hover:text-white"
      >
        <FaArrowLeft className="mr-2" />
        Back to Events
      </button>

      <div className="space-y-6">
        <div className="card">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Event Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Start Date
                  </label>
                  <p className="text-gray-800 dark:text-gray-300">
                    {new Date(event.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    End Date
                  </label>
                  <p className="text-gray-800 dark:text-gray-300">
                    {new Date(event.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Location
                  </label>
                  <p className="text-gray-800 dark:text-gray-300">
                    {event.location}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Sports Category
                  </label>
                  <p className="text-gray-800 dark:text-gray-300">
                    {event.sportsCategory}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Organizer
                  </label>
                  <p className="text-gray-800 dark:text-gray-300">
                    {event.organizer}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400">
                    Contact
                  </label>
                  <p className="text-gray-800 dark:text-gray-300">
                    {event.contact}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {event.description}
              </p>

              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Rules
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>

              <h2 className="text-lg font-semibold mt-6 mb-4 text-gray-800 dark:text-white">
                Prizes
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {event.prizes.map((prize, index) => (
                  <li key={index}>{prize}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Participants
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">
                    Mobile
                  </th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-300">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {event.participants.map((participant, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                      {participant.name}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                      {participant.mobile}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                      {participant.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
