
import { Link } from 'react-router-dom'; 

export default function Register() {
    return (
        <div className="flex justify-center items-center py-12 px-4 bg-blue-50 min-h-[calc(100vh-160px)]"> 
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Create Patient Account
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Register to access seamless token booking.
                </p>

                <form className="space-y-4">
                    
                    <div>
                        <label 
                            htmlFor="fullName" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label 
                                htmlFor="phone" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                                placeholder="(+91) 98765 43210"
                            />
                        </div>
                        <div>
                            <label 
                                htmlFor="dob" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label 
                                htmlFor="bloodGroup" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Blood Group
                            </label>
                            <select
                                id="bloodGroup"
                                name="bloodGroup"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm bg-white"
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label 
                                htmlFor="address" 
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Address (City/Town, State)
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
                                placeholder="Puducherry, Tamil Nadu"
                            />
                        </div>
                    </div>
                    <div>
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Create Password
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
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-6"
                    >
                        Register Account
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link 
                        to="/login" 
                        className="font-medium text-blue-600 hover:text-blue-500 ml-1 transition duration-150"
                    >
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
}