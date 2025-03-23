import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

export default function Profile() {
const server = "http://localhost:5000";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${server}/profile/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${server}/profile/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: response.data.profilePicture,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen bg-gray-100">
    
      <nav className="bg-white p-4 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Account Settings</h1>
        </div>
      </nav>

      
      <div className="max-w-7xl mx-auto p-8 mt-8 flex items-center">
      
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
            {user?.profilePicture ? (
              <img
                src={`${server}${user.profilePicture}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaCamera className="text-gray-600 text-2xl" />
            )}
          </div>

        
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer flex items-center justify-center">
            <FaCamera className="text-white text-sm" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

       
        <div className="flex-grow pl-4">
          <h2 className="text-lg font-semibold text-gray-800">{user?.fullName}</h2>
          <p className="text-gray-500 mt-1">{user?.email}</p>
          <p className="text-gray-600 mt-2 text-sm">Welcome! You can upload your profile picture here.</p>
        </div>
      </div>
    </div>
  );
}
