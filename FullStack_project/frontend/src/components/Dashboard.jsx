export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to your Dashboard!
        </h2>
        <p className="text-gray-600 text-lg">
          Here you can see stats, charts, and other widgets.
        </p>
      </div>
    </div>
  );
}
