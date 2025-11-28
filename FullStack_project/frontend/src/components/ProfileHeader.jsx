import "../styles/styles.css";
import profileIcon from "../assets/profile.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader() {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setUser(res.data))
            .catch(err => console.error("Profile fetch error:", err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const profilePhoto = user?.profilePhoto ? `${API_URL}${user.profilePhoto}` : profileIcon;
   return (
  <>
    {/* Header */}
    <div className="flex justify-between items-center bg-[#282c34] text-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold tracking-wide">ExpenseTracker</h1>

      <div className="cursor-pointer">
        <img
          src={profilePhoto}
          alt={user?.name || "Profile"}
          className="w-10 h-10 rounded-full object-cover border-2 border-white hover:scale-105 transition"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
    </div>

    {/* Modal */}
    {isModalOpen && user && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="bg-white rounded-xl p-6 shadow-xl text-center max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={profilePhoto}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
          />
          <h2 className="text-lg font-semibold text-gray-800 mt-3">{user.name}</h2>

          <button
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )}
  </>
);


}