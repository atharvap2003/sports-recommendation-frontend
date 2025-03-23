import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

const ProfilePage = () => {
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.id); // Get user ID from Redux
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/users/getUser/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setProfile({
            name: data.user.fullname,
            dob: "", // No DOB in response, add if available
            email: data.user.email,
            phone: data.user.mobile_number,
            studentId: data.user.prn_number,
            institution: "Sinhgad College of Engineering",
            department: data.user.department,
            year: data.user.year,
            preferredSports:
              data.user.registeredEvents.map((event) => event.sportsCategory) ||
              [],
            participationHistory: data.user.registeredEvents || [],
            skillLevel: "Intermediate", // Default value
            achievements: [], // No achievements in response
            profileImage: data.user.profile_picture,
            feeReceipt: data.user.collegeid,
            address: data.user.address,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) fetchUserProfile();
  }, [id]);

  if (!profile) {
    return <div className="text-center text-lg mt-10">Loading Profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-11">
        <div className="bg-gradient-to-r from-indigo-950 to-purple-900 rounded-t-2xl p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-white/80" />
                )}
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-indigo-200 mb-1">
                Student ID: {profile.studentId}
              </p>
              <p className="text-indigo-200">
                {profile.department} | {profile.year}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {["name", "studentId", "email", "phone", "address"].map(
                (field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-gray-500 text-sm capitalize">
                      {field.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </label>
                    <p className="text-gray-800">{profile[field] || "N/A"}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Personal Sports Interest
            </h2>
            <p className="text-gray-800">
              {profile.preferredSports.length > 0
                ? profile.preferredSports.join(", ")
                : "Not provided"}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Participation History</h2>
            {profile.participationHistory.length > 0 ? (
              profile.participationHistory.map((event, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg mb-2 flex justify-between"
                >
                  <p className="font-medium">Event: {event.title}</p>
                  <p className="text-gray-600">
                    Category Sports: {event.sportsCategory}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-800">No Past Record Found</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Identification Documents
            </h2>
            <div className="grid grid-cols-2">
              <div className="flex justify-between col-span-2">
                <label className="text-gray-500 text-sm capitalize">
                  College Fee Receipt
                </label>
                {profile.feeReceipt ? (
                  <a
                    href={profile.feeReceipt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 underline"
                  >
                    <FiFileText className="mr-2 text-xl" /> View Receipt
                  </a>
                ) : (
                  <p className="text-gray-800 flex items-center">
                    <FiFileText className="mr-2 text-xl text-red-600" /> No Fee
                    Receipt Provided!!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              Recommended Events to Register:
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-2 flex justify-between">
              <p className="font-medium"> Events 1 </p>
              <p className="text-gray-600">
                <a
                  href={"/events"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 underline"
                >
                  Click here to Register
                </a>
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-2 flex justify-between">
              <p className="font-medium"> Events 2 </p>
              <p className="text-gray-600">
                <a
                  href={"/events"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 underline"
                >
                  Click here to Register
                </a>
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-2 flex justify-between">
              <p className="font-medium"> Events 3 </p>
              <p className="text-gray-600">
                <a
                  href={"/events"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 underline"
                >
                  Click here to Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
