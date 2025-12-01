import AdminSidebar from "./AdminSidebar";

export default function Admin() {
    return (
        <div className="flex">
            <AdminSidebar currentPath="/admin" />
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Welcome Admin!</h1>
                <p className="mt-2 text-gray-600">
                    Dashboard Overview Coming Soon...
                </p>
            </div>
        </div>
    );
}
