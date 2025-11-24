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
            <div className="pro-header">
                <h1 className="profile-title">ExpenseTracker</h1>
                <div className="nav-links">
                    <img src={profilePhoto} alt={user?.name || "Profile"} className="profile-icon" onClick={() => setIsModalOpen(true)} />
                </div>
            </div>
            {isModalOpen && user && (
                <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={profilePhoto}

                            alt={user.name}
                            className="modal-profile-photo"
                        />
                        <h2>{user.name}</h2>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

            )}
        </>
    );

}