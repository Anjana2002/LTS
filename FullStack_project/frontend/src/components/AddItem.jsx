import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addItem } from "../redux/itemSlice";
import "../styles/styles.css";
import { useAddItemMutation } from "../redux/itemSlice";
import { useForm } from "@tanstack/react-form";

export default function AddItem() {
    const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();
    // const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    // const success = useSelector((state) => state.items.success);
    // const error = useSelector((state) => state.items.error);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("itemImage", image);

        // dispatch(addItem(formData)); 
        try {
            await addItem(formData).unwrap();                                                       
            setName("");
            setPrice("");
            setDescription("");
            setImage(null);
        } catch {
            alert("Failed to add item")
        }
    };

    return (
        <div className="form-container">
            <h2>Add Item</h2>
            <form className="form-box" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />

                <label>Price:</label>
                <input type="number" onChange={(e) => setPrice(e.target.value)} />

                <label>Description:</label>
                <textarea onChange={(e) => setDescription(e.target.value)} />

                <label>Image</label>
                <input
                    type="file"
                    name="itemImage"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Register"}
                </button>

                {isSuccess && <p className="success-msg">Item added successfully!</p>}
                {isError && <p className="error-msg">Failed to add item</p>}
            </form>
        </div>
    );
}
