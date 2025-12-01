export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
            <h1 className="text-6xl font-extrabold text-red-600 mb-4">
                404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                Page Not Found
            </h2>
            <p className="text-lg text-gray-600">
                The page you are looking for does not exist.
            </p>
            <a href="/" className="mt-8 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                Go to Homepage
            </a>
        </div>
    );
}