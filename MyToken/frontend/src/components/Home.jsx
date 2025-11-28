
export default function Home() {
  
    const doctorsIllustrationPath = "/dr.jpg";

    return (
        <div className="flex-grow bg-blue-50 py-8">
            <div className="container mx-auto px-4 sm:px-8">
                <section className="flex flex-col lg:flex-row items-center justify-between bg-white p-10 rounded-lg shadow-xl mb-12">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
                            Book Your Hospital Token <span className="text-blue-600">Seamlessly</span>
                        </h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Skip the long queues. Tour our seamless token booking process.
                        </p>
                        <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                            Book Now
                        </button>
                    </div>

                    <div className="lg:w-1/2 flex justify-center p-4">
                        <img 
                            src={doctorsIllustrationPath}
                            alt="Doctors preparing for token booking" 
                            className="w-full max-w-lg h-auto" 
                        />
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
                        <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Quick & Easy</h3>
                        <p className="mt-2 text-gray-500">Book your token in less than 60 seconds from anywhere.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
                        <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Real-time Updates</h3>
                        <p className="mt-2 text-gray-500">Get SMS and in-app alerts on your token status.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">
                        <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.148a2.533 2.533 0 00-3.374-3.374L9 11.228V7.5a2.5 2.5 0 00-5 0v3.728l-2.244 2.244a2.533 2.533 0 00-.012 3.398l1.758 1.758a2.533 2.533 0 003.398-.012L9 16.772v3.728a2.5 2.5 0 005 0v-3.728l2.244-2.244a2.533 2.533 0 00.012-3.398l-1.758-1.758z"></path></svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Secure & Private</h3>
                        <p className="mt-2 text-gray-500">Your health data and privacy are fully protected.</p>
                    </div>
                </section>
                <div className="flex justify-center space-x-2 mt-10">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    <span className="w-3 h-3 bg-blue-200 rounded-full"></span>
                    <span className="w-3 h-3 bg-blue-200 rounded-full"></span>
                </div>
            </div>
        </div>
    );
}