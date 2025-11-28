// src/components/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
    return (
        <div className="flex justify-center items-center py-12 px-4 bg-blue-50 min-h-[calc(100vh-160px)]"> 
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Sign in to book your token seamlessly.
                </p>

                <form className="space-y-6">
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link 
                        to="/register" 
                        className="font-medium text-blue-600 hover:text-blue-500 ml-1 transition duration-150"
                    >
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}