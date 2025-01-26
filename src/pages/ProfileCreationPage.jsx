import React, { useState } from "react";
import { User, Camera, FileText, Info } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebaseConfig"; // Import firebase storage config
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios"; // Import axios for making HTTP requests

const ProfileCreationPage = () => {
  const navigate = useNavigate();
  const userid = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  console.log(userid, token);

  // State to hold files, upload status, and downloadable URLs
  const [profilePic, setProfilePic] = useState(null);
  const [feeReceipt, setFeeReceipt] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState({
    profilePicUrl: null,
    feeReceiptUrl: null,
    idProofUrl: null,
  });

  const [formData, setFormData] = useState({
    department: "",
    currentYear: "",
    prnNumber: "",
    age: "",
    description: "",
    address: "",
  });

  const departments = [
    "IT",
    "CS",
    "EnTC",
    "Mech",
    "Biotech",
    "Electrical",
    "Civil",
  ];
  const years = ["FE", "SE", "TE", "BE"];

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "profilePic") {
      setProfilePic(file); // Store file directly for upload
    } else if (type === "feeReceipt") {
      setFeeReceipt(file);
    } else if (type === "idProof") {
      setIdProof(file);
    }
  };

  const handleUpload = async (file, type) => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `users/${userid}/${type}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Track upload progress here
      },
      (error) => {
        console.error("Error uploading file:", error);
        setUploading(false);
        alert("File upload failed, process will be cancelled.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploading(false);
          setDownloadUrls((prevUrls) => ({
            ...prevUrls,
            [`${type}Url`]: downloadURL,
          }));
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload files first
    if (feeReceipt) await handleUpload(feeReceipt, "feeReceipt");
    if (idProof) await handleUpload(idProof, "idProof");
    if (profilePic) await handleUpload(profilePic, "profilePic");

    // Check if all uploads are completed successfully
    if (
      !downloadUrls.profilePicUrl ||
      !downloadUrls.feeReceiptUrl ||
      !downloadUrls.idProofUrl
    ) {
      alert("Some files failed to upload. Cancelling profile submission.");
      return;
    }

    // Wait for 5 seconds before submitting the data
    setTimeout(async () => {
      try {
        const dataToPost = {
          userId: userid,
          ...formData,
          profile_image: downloadUrls.profilePicUrl,
          fee_receipt: downloadUrls.feeReceiptUrl,
          id_proof: downloadUrls.idProofUrl,
        };

        console.log(dataToPost);

        const response = await axios.post(
          "http://localhost:3000/api/auth/create-profile",
          dataToPost,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Pass the token here
            },
          }
        );

        if (response.status === 200) {
          alert("Profile created successfully!");
          navigate("/"); // Redirect to profile or wherever necessary
        } else {
          alert("Error creating profile");
        }
      } catch (error) {
        console.error("Error submitting profile:", error);
        alert("Error creating profile, try again later.");
      }
    }, 8000); // Wait for 5 seconds
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Student Profile
          </h1>
          <p className="text-xl text-gray-600">Submit your academic details</p>
        </div>

        <div className="space-y-8">
          {/* Profile Picture */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Camera className="h-6 w-6 text-indigo-600" />
              Profile Picture
            </h2>
            <div className="flex flex-col items-center mt-4">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 mb-4">
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                )}
              </div>
              <label className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-700">
                Upload Picture
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profilePic")}
                />
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6 text-indigo-600" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div>
                <label className="block text-gray-700 mb-2">Department</label>
                <select
                  className="w-full p-3 border rounded-lg"
                  name="department"
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Current Year</label>
                <select
                  className="w-full p-3 border rounded-lg"
                  name="currentYear"
                  onChange={handleInputChange}
                >
                  <option value="">Select Year</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">PRN Number</label>
                <input
                  type="text"
                  name="prnNumber"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Info className="h-6 w-6 text-indigo-600" />
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  name="description"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  name="address"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              Documents
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Fee Receipt
                </label>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "feeReceipt")}
                  />
                  <div className="w-full p-3 border rounded-lg cursor-pointer">
                    Upload Fee Receipt
                  </div>
                </label>
                {feeReceipt && (
                  <div className="mt-2 text-green-500">
                    Fee Receipt Uploaded
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  ID Proof
                </label>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "idProof")}
                  />
                  <div className="w-full p-3 border rounded-lg cursor-pointer">
                    Upload ID Proof
                  </div>
                </label>
                {idProof && (
                  <div className="mt-2 text-green-500">ID Proof Uploaded</div>
                )}
              </div>
            </div>
          </div>

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage;
