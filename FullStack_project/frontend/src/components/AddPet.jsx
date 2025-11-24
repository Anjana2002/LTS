import { useForm } from "@tanstack/react-form"
import "../styles/styles.css";

export default function AddPet() {
    const form = useForm({
        defaultValues: {
            petName: "",
            animal: "",
        },
        onSubmit: ({ value }) => {
            alert(`Pet Added \n Name : ${value.petName} \n Animal: ${value.animal}`);
        },
    });
    return (
        <div className="form-container">
            <h2>Add Pet</h2>
            <form className="form-box" onSubmit={form.handleSubmit}>
                <form.Field name="petName"
                    validators={{
                        onSubmit: ({ value }) =>
                                value.length < 1 ? "Pet name is required" : undefined,
                    }}>
                    {(field) => (
                        <div style={{ marginBottom: "10px" }}>
                            <label>Pet Name:</label>
                            <input
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                style={{ padding: "5px", width: "100%" }}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p style={{ color: "red", margin: 0 }}>
                                    {field.state.meta.errors[0]}
                                </p>
                            )}

                        </div>
                    )}
                </form.Field>
                <form.Field name="animal">
                    {(field) => (
                        <div style={{ marginBottom: "10px" }}>
                            <label>Which Animal:</label>
                            <select
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                style={{ padding: "5px", width: "100%" }}
                            >
                                <option value="">Select...</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>

                            </select>

                        </div>
                    )}

                </form.Field>
                <button type="submit" className="submit-btn" >Submit</button>

            </form>
        </div>
    )
}