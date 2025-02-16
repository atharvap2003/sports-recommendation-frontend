import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Trophy,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Shield,
  Clipboard,
  Medal,
  DollarSign,
  User,
  Phone,
  Mail,
  Heart,
  IndianRupee,
} from "lucide-react";
import { events } from "../data/events";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const event = events.find((e) => e.id === parseInt(id));
  let date;
  const [event, setEventDetails] = useState();
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/getevent/${id}`);
        const data = await response.json();
        if (data.success) {
          setEventDetails(data.event)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEventDetails();
  },[id]);
  
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    emergencyContact: "",
    medicalConditions: "",
    termsAccepted: false,
    rulesAccepted: false,
  });

  const [showForm, setShowForm] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Event not found
          </h2>
          <button
            onClick={() => navigate("/events")}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="relative h-[300px] rounded-xl overflow-hidden mb-8">
          <img
            src="https://tiemdelhi.com/blogs/wp-content/uploads/2023/03/sports-1024x683.jpg"
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <div className="max-w-3xl">
              <div className="mb-4">
                <h1 className="text-5xl font-bold text-white mb-4">
                  {event.title}
                </h1>
                <p className="text-xl text-gray-200 mb-6">
                  {event.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-6 text-white">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {event.location}
                </span>
                <span className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Registration Deadline: {new Date(event.applyLastDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Highlights */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="h-6 w-6 text-indigo-600 mr-2" />
                Event Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                  <Medal className="h-8 w-8 text-indigo-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Medals & Trophies</h3>
                    <p className="text-sm text-gray-600">
                      For winners & runners-up
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                  <Award className="h-8 w-8 text-indigo-600 mr-4" />
                  <div>
                    <h3 className="font-semibold">Certificates</h3>
                    <p className="text-sm text-gray-600">
                      For all participants
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Information */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Info className="h-6 w-6 text-indigo-600 mr-2" />
                Detailed Information
              </h2>
              <div className="prose max-w-none text-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Event Description
                </h3>
                <p className="mb-4">
                  {event.description}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Prizes 
                </h3>
                <p className=" mb-4">
                  {event.prizes}
                </p>
              </div>
            </section>

            {/* Rules & Requirements */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Clipboard className="h-6 w-6 text-indigo-600 mr-2" />
                Rules & Requirements
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Eligibility
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        Must be a current student with valid college ID
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Age between 18-25 years</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Equipment & Dress Code
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Standard sports equipment will be provided</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        Participants must wear appropriate sports attire
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Important Notes
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        Participants must report 30 minutes before their
                        scheduled time
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                      <span>Decision of judges will be final and binding</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                      <span>
                        Any form of misbehavior will lead to immediate
                        disqualification
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Phone className="h-6 w-6 text-indigo-600 mr-2" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Event Coordinator</h3>
                    <p className="text-gray-600">Mr. Rahul Sharma</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">sports@sinhgad.edu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Emergency Support</h3>
                    <p className="text-gray-600">+91 98765 43211</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Registration Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <div className="mb-6">
                <div className="text-2xl font-bold mb-2">
                  Registration Details
                </div>
                <div className="text-gray-600 mb-4">
                  Deadline till: {new Date(event.applyLastDate).toLocaleDateString()}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    event.remainingSlots > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {event.remainingSlots > 0
                    ? `${event.remainingSlots} slots remaining`
                    : "Registration Closed"}
                </div>
                <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-2">
                    Registration Fee
                  </h3>
                  <div className="flex items-center text-indigo-600">
                    <IndianRupee className="h-5 w-5 mr-2" />
                    <span className="text-2xl font-bold">-</span>
                  </div>
                  <p className="text-sm text-indigo-900 mt-2">
                    Includes event kit & refreshments
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                disabled={event.remainingSlots === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 ${
                  event.remainingSlots > 0
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                }`}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Registration Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-6">
                Register for {event.title}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) =>
                        setFormData({ ...formData, studentId: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Previous Experience
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Coordinator Contac *
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Medical Conditions
                  </label>
                  <textarea
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalConditions: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-lg"
                    rows={2}
                    placeholder="List any medical conditions or allergies"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          termsAccepted: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the terms and conditions *
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rules"
                      checked={formData.rulesAccepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rulesAccepted: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="rules"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I have read and agree to follow all event rules *
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="liability"
                      checked={formData.liabilityAccepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          liabilityAccepted: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="liability"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I accept the liability waiver *
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medical"
                      checked={formData.medicalAccepted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          medicalAccepted: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <label
                      htmlFor="medical"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I confirm that I am medically fit to participate *
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Submit Registration
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;
