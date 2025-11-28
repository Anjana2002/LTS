import axios from "axios";
import { useState } from "react";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                {
                    email: formData.email,
                    password: formData.password
                }
            );
            localStorage.setItem("token", res.data.token);

            setMessage(res.data.message || "Login successful!");
            setFormData({ email: "", password: "" });
            navigate("/dashboard/profile");
        } catch (error) {
            setMessage("Login failed. Please try again.");
        }
    };
    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="form-box">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                {/* <button type="submit" className="submit-btn">Login</button> */}
                <button
                    type="submit"
                    className="bg-[#282c34] hover:bg-[#1f242b] text-white px-4 py-2 rounded-md transition-colors"
                >
                    Login
                </button>


            </form>
            {message && <p className="form-message">{message}</p>}

        </div>
    )
}