import { useLocation } from "react-router-dom";
import Layout from "./layout.jsx";
import "../App.css";


export default function ShowRecepie() {
    const location = useLocation();
    const recipe = location.state;
    if (!recipe) return <Layout><p>No recipe data available.</p></Layout>;
    return (
        <Layout>
        <div className="add-form">
            <div className="recepie">
                <h2>{recipe.name}</h2>
                <p>Ingredients:</p>
                <p>{recipe.ingredients}</p>
                <p>Instructions:</p>
                <p>{recipe.instructions}</p>
                <p>Preparation Time: {recipe.prepTime} minutes</p>
                {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ maxWidth: "250px", marginTop: "10px" }} />}

            </div>
        </div>
        </Layout>
    );
}
