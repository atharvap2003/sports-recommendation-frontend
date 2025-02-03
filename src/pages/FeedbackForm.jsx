import React, { useState } from "react";
import { Star, Send, X } from "lucide-react";

const FeedbackForm = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    feedback: "",
    improvements: "",
  });

  const categories = [
    "Sports Facilities",
    "Equipment Quality",
    "Coaching Staff",
    "Events Organization",
    "Overall Experience",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ ...formData, rating });
    onClose();
    // Reset form
    setFormData({
      name: "",
      email: "",
      category: "",
      feedback: "",
      improvements: "",
    });
    setRating(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Feedback Matters
          </h2>
          <p className="text-gray-600 mt-2">
            Help us improve our sports facilities and services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="text-center">
            <label className="block text-gray-700 font-medium mb-4">
              Overall Rating
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              What did you like about our services?
            </label>
            <textarea
              value={formData.feedback}
              onChange={(e) =>
                setFormData({ ...formData, feedback: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          {/* Improvements */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              What can we improve?
            </label>
            <textarea
              value={formData.improvements}
              onChange={(e) =>
                setFormData({ ...formData, improvements: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
