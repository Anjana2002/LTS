import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../redux/counterSlice";

export default function Counter() {
    const count = useSelector((state) => state.counter.value);
    // const [date, setDate] = React.useState < Date | undefined > (new Date()) 
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center gap-6 py-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800">
                Counter: <span className="text-blue-600">{count}</span>
            </h2>

            <div className="flex gap-4">
                <button
                    onClick={() => dispatch(increment())}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                    Increment
                </button>

                <button
                    onClick={() => dispatch(decrement())}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                    Decrement
                </button>

                <button
                    onClick={() => dispatch(reset())}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                    Reset
                </button>
            </div>
          
        </div>
    );
}
