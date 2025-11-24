// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchItems } from "../redux/itemSlice";
import "../styles/styles.css";
import { useFetchItemsQuery } from "../redux/itemSlice";                                                        

export default function ViewItems() {
    const { data: list = [], isLoading, isError } = useFetchItemsQuery();
    // const dispatch = useDispatch();
    // const { list, loading, error } = useSelector((state) => state.items);

    // useEffect(() => {
    //     dispatch(fetchItems());
    // }, [dispatch]);

    return (
        <div className="items-container">
            <h2>All Items</h2>

            {/* {loading && <p>Loading items...</p>}
            {error && <p className="error-msg">{error}</p>} */}
            {isLoading && <p>Loading items...</p>}
            {isError && <p className="error-msg">Failed to load items</p>}


            <div className="items-grid">
                {list.map((item) => (
                    <div key={item.id} className="item-card">

                        {item.itemImage && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${item.itemImage}`}
                                alt="item"
                                className="item-img"
                            />
                        )}

                        <h3>{item.name}</h3>
                        <p><b>Price:</b> ₹{item.price}</p>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
