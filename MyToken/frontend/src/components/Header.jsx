// Header.jsx
import React from 'react';

export default function Header() {
    // Define the logoPath variable here (assuming the file is in your public folder)
    const logoPath = "/letter-m.png"; // Make sure your 'letter-m.png' is in the public folder

    return (
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
            <div className="flex items-center space-x-2">
                <img
                    src={logoPath}
                    alt="MyToken Logo"
                    className="w-8 h-8 rounded-full"
                />
                <h1 className="text-lg font-semibold text-gray-800">
                    MyToken
                </h1>
            </div>

            <nav className="space-x-8 text-gray-600">
                <a href="#" className="font-semibold text-blue-600 transition duration-150">
                    Home
                </a>
                <a href="#" className="hover:text-blue-600 transition duration-150">
                    Service
                </a>
                <a href="#" className="hover:text-blue-600 transition duration-150">
                    Login
                </a>
            </nav>
        </header>
    );
}