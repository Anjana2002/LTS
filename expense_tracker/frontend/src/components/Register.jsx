import { useState } from "react";
import "../styles/styles.css";
import axios from "axios";
export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
        location: "",
        password: "",
        profilePhoto: null,
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "profilePhoto") {
            setFormData({
                ...formData,
                profilePhoto: e.target.files[0],
            });

        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        } 
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/register`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            setMessage(res.data.message || "Registration successful!");
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        }
    };


    return (
        <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="form-box">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <label>Profile Photo:</label>
                <input type="file" name="profilePhoto" onChange={handleChange} accept="image/*" />
                <button type="submit" className="submit-btn">Register</button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    )
}