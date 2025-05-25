import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
        <div className="max-w-3xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome, {user.firstName} {user.lastName}!
            </h1>
            <p className="text-gray-600">👤 Role: {user.role}</p>
          </div>

          {/* Profile settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👥 Account</h2>
            <Link
                to="/profile"
                className="inline-block text-blue-600 hover:text-blue-800 transition duration-200"
            >
              ⚙️ Change profile information
            </Link>
          </div>

          {/* Client section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🧍 Client</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/services" className="text-blue-600 hover:text-blue-800 transition duration-200">
                    🔍 Browse services
                  </Link>
                </li>
                <li>
                  <Link to="/my-reservations" className="text-blue-600 hover:text-blue-800 transition duration-200">
                    📋 My reservations
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className="text-blue-600 hover:text-blue-800 transition duration-200">
                    🔔 Notifications
                  </Link>
                </li>
              </ul>
            </div>

            {/* Provider section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">🛠️ Provider</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/create-service" className="text-blue-600 hover:text-blue-800 transition duration-200">
                    ➕ Create a new service
                  </Link>
                </li>
                <li>
                  <Link to="/my-services" className="text-blue-600 hover:text-blue-800 transition duration-200">
                    🧾 Manage my services
                  </Link>
                </li>
                <li>
                  <Link to="/my-obligations" className="text-blue-600 hover:text-blue-800 transition duration-200">
                    📆 My obligations
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Invoices section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">💵 Invoices</h2>
            <p className="text-gray-600 text-sm mb-2">
              View your invoices as a client or provider.
            </p>
            <Link
                to="/invoices"
                className="text-blue-600 hover:text-blue-800 transition duration-200"
            >
              📄 View my invoices
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
