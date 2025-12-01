// src/components/AdminSidebar.jsx

import { Home, User, Calendar, Briefcase, FileText, Plus, Eye } from 'lucide-react';

const sidebarNavItems = [
    {
        title: "Main",
        items: [{ icon: Home, label: "Dashboard" }]
    },
    {
        title: "Doctors & Schedules",
        items: [
            {
                label: "Doctors",
                icon: User,
                subItems: [
                    { icon: Plus, label: "Add Doctor" },
                    { icon: Eye, label: "View/Edit Doctors" },
                ]
            },
            {
                label: "Schedules",
                icon: Calendar,
                subItems: [
                    { icon: Plus, label: "Add Schedule" },
                    { icon: Eye, label: "View/Edit Schedules" },
                ]
            },
            {
                label: "Departments",
                icon: Briefcase,
                subItems: [
                    { icon: Plus, label: "Add Department" },
                    { icon: Eye, label: "View Departments" },
                ]
            },
        ]
    },
    {
        title: "Bookings",
        items: [{ icon: FileText, label: "Appointments" }]
    }
];

const NavLink = ({ icon: Icon, label }) => (
    <div className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </div>
);

export default function AdminSidebar() {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-100 p-4 shadow-sm">
            {sidebarNavItems.map((section, idx) => (
                <div key={idx} className="mb-6">
                    <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">
                        {section.title}
                    </h3>

                    <nav className="space-y-1">
                        {section.items.map((item, i) => (
                            <div key={i}>
                                <NavLink icon={item.icon} label={item.label} />

                                {item.subItems && (
                                    <div className="ml-5 mt-1 space-y-1 border-l border-gray-200">
                                        {item.subItems.map((subItem, j) => (
                                            <NavLink
                                                key={j}
                                                icon={subItem.icon}
                                                label={subItem.label}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            ))}
        </aside>
    );
}
