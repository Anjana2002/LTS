import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";


export default function AddRecepie() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        ingredients: "",
        instructions: "",
        prepTime: "",
        image: null

    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const previewURL = formData.image ? URL.createObjectURL(formData.image) : null;
        navigate("/show-recepie", { state: { ...formData, image: previewURL } });
        setFormData({
            name: "",
            ingredients: "",
            instructions: "",
            prepTime: "",
            image: null

        });
    };
    return (
        <div className="add-form">
            <div className="recepie">
                <h2>Add New Recipe</h2>
                <form className="recepie-form" onSubmit={handleSubmit}>
                    <label>Recepie Name</label>
                    <input type='text' name="name" value={formData.name} onChange={handleChange} placeholder="Enter recipe name" required />

                    <label>Ingredients</label>
                    <textarea name="ingredients"value={formData.ingredients} onChange={handleChange} placeholder="List ingredients here" required></textarea>

                    <label>Instructions</label>
                    <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Enter cooking instructions" required></textarea>


                    <label>Preparation Time (in minutes)</label>
                    <input name="prepTime" value={formData.prepTime} type="number" onChange={handleChange} placeholder="e.g., 30" required />

                    <label>Image </label>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

                    <button type="submit" className="submit-btn">Add Recipe</button>
                </form>
            </div>
        </div>

    )

};