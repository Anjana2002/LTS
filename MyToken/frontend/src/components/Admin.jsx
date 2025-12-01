

import AdminSidebar from "./AdminSidebar";
import { Users, Calendar, Stethoscope, Clock, CheckCircle, Plus, FileText } from 'lucide-react'; // Import icons

export default function Admin() {
    const currentPath = "/admin"; 

    const stats = [
        { title: "Total Doctors", value: 45, icon: Stethoscope, color: "bg-blue-100 text-blue-600" },
        { title: "Upcoming Appointments", value: 128, icon: Calendar, color: "bg-green-100 text-green-600" },
        { title: "New Patients Today", value: 15, icon: Users, color: "bg-purple-100 text-purple-600" },
        { title: "Open Schedules", value: 92, icon: Clock, color: "bg-yellow-100 text-yellow-600" },
    ];

    const recentActivities = [
        { type: "Appointment Booked", description: "Patient John Doe booked with Dr. Smith for 10:30 AM on 2023-10-27.", time: "5 minutes ago" },
        { type: "Doctor Added", description: "Dr. Emily White (Cardiology) was added to the system.", time: "1 hour ago" },
        { type: "Schedule Updated", description: "Dr. Alice Brown's Monday schedule updated.", time: "3 hours ago" },
        { type: "Appointment Cancelled", description: "Patient Jane Roe cancelled booking with Dr. Davis.", time: "Yesterday" },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar currentPath={currentPath} />
            
            <div className="flex-1 p-6 sm:p-8"> 
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-5 flex items-center space-x-4">
                            <div className={`${stat.color} p-3 rounded-full`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
                        <ul className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                                        <p className="text-sm text-gray-600">{activity.description}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <a href="/admin/doctors/add" className="block text-blue-600 hover:text-blue-800 font-medium transition duration-150">
                                <Plus className="inline-block w-4 h-4 mr-2" /> Add New Doctor
                            </a>
                            <a href="/admin/schedules/add" className="block text-blue-600 hover:text-blue-800 font-medium transition duration-150">
                                <Calendar className="inline-block w-4 h-4 mr-2" /> Create Schedule
                            </a>
                            <a href="/admin/appointments" className="block text-blue-600 hover:text-blue-800 font-medium transition duration-150">
                                <FileText className="inline-block w-4 h-4 mr-2" /> View All Appointments
                            </a>
                            <hr className="my-3 border-gray-200" />
                            <p className="text-sm text-gray-700">
                                Remember to regularly check for doctor leaves and update schedules.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}