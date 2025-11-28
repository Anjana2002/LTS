import "../styles/styles.css";
import { useAddItemMutation } from "../redux/itemSlice";
import { useForm } from "@tanstack/react-form";

export default function AddItem() {
    const [addItem, { isLoading, isError, isSuccess }] = useAddItemMutation();

    const myForm = useForm({
        defaultValues: {
            name: "",
            price: "",
            description: "",
            image: null,
        },
        onSubmit: async ({ value }) => {
            const formData = new FormData();
            formData.append("name", value.name);
            formData.append("price", value.price);
            formData.append("description", value.description);
            formData.append("itemImage", value.image);

            try {
                await addItem(formData).unwrap();
                myForm.reset();
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <div className="form-container">
            <h2>Add Item</h2>

            <form
                className="form-box"
                onSubmit={(e) => {
                    e.preventDefault();
                    myForm.handleSubmit();
                }}
            >

                <myForm.Field
                    name="name"
                    validators={{
                        onChange: ({ value }) =>
                            !value || value.length < 2
                                ? "Name must be at least 2 characters"
                                : undefined,
                    }}
                >
                    {(field) => (
                        <>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="error-msg">{field.state.meta.errors[0]}</p>
                            )}
                        </>
                    )}
                </myForm.Field>

                <myForm.Field
                    name="price"
                    validators={{
                        onChange: ({ value }) =>
                            !value || Number(value) <= 0
                                ? "Price must be a positive number"
                                : undefined,
                    }}
                >
                    {(field) => (
                        <>
                            <label>Price:</label>
                            <input
                                type="number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="error-msg">{field.state.meta.errors[0]}</p>
                            )}
                        </>
                    )}
                </myForm.Field>

                <myForm.Field
                    name="description"
                    validators={{
                        onChange: ({ value }) =>
                            !value || value.length < 10
                                ? "Description must be at least 10 characters"
                                : undefined,
                    }}
                >
                    {(field) => (
                        <>
                            <label>Description:</label>
                            <textarea
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="error-msg">{field.state.meta.errors[0]}</p>
                            )}
                        </>
                    )}
                </myForm.Field>

                <myForm.Field
                    name="image"
                    validators={{
                        onChange: ({ value }) =>
                            !value ? "Image is required" : undefined,
                    }}
                >
                    {(field) => (
                        <>
                            <label>Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.handleChange(e.target.files[0])}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="error-msg">{field.state.meta.errors[0]}</p>
                            )}
                        </>
                    )}
                </myForm.Field>

                <button type="submit" disabled={isLoading} className="submit-btn">
                    {isLoading ? "Adding..." : "Register"}
                </button>

                {isSuccess && <p className="success-msg">Item added successfully!</p>}
                {isError && <p className="error-msg">Failed to add item</p>}
            </form>
        </div>
    );
}
