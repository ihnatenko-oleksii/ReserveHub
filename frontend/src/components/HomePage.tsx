import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to ReserveHub
          </h1>
          <p className="text-xl text-gray-600">
            Your one-stop solution for managing reservations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">📅</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Easy Booking</h2>
            <p className="text-gray-600">
              Book your appointments with just a few clicks. Simple and efficient.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🔔</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Smart Reminders</h2>
            <p className="text-gray-600">
              Never miss an appointment with our automated reminder system.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Everything</h2>
            <p className="text-gray-600">
              Keep track of all your reservations in one place.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 