import "../styles/styles.css";
import defaultProfile from "../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../redux/profileSlice";

export default function ProfileSection() {
    // const [user, setUser] = useState(null);
    // const API_URL = import.meta.env.VITE_API_URL;

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     axios.get(`${API_URL}/profile`, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //     .then(res => setUser(res.data))
    //     .catch(err => console.error("Profile error:", err));
    // }, []);
    // if (!user) return <p>Loading profile...</p>;

    const API_URL = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch();
    const { user, loading, error} = useSelector((state) => state.profile);
    useEffect(() =>{
        dispatch(fetchProfile());
    }, []);    
    if (loading) return <p>loading...</p>
    if (error) return <p>error</p>
    if (!user) return null;                                                                             
                                                                                                    
    const photoUrl = user?.profilePhoto
        ? API_URL + user.profilePhoto
        : defaultProfile;
    const formattedDob =
        user.dateOfBirth?.date
            ? new Date(user.dateOfBirth.date).toISOString().split("T")[0]
            : null;

    return (
        
        <div className="profile-section">
            <h2>My Profile</h2>
            <div className="profile-card">  
                <img
                    src={photoUrl}
                    alt={user?.name || "User"}
                    className="profile-photo-large"
                />
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {user.location && (
                    <p><strong>Location:</strong> {user.location}</p>
                )}
                {formattedDob && (
                    <p><strong>DOB:</strong> {formattedDob}</p>
                )}

            </div>
        </div>
    );
}
