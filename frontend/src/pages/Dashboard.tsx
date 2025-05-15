import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null; // fallback, але сюди не потрапиш завдяки PrivateRoute

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user.firstName} {user.lastName}!
        </h1>
        <p className="text-gray-600">Role: {user.role}</p>

          <div className="space-y-4">
            <Link to="/services" className="text-blue-600 underline">
              🔍 Browse services
            </Link>
            <Link to="/my-reservations" className="text-blue-600 underline block">
              📋 My reservations
            </Link>
          </div>

          <div className="space-y-4">
            <Link to="/create-service" className="text-blue-600 underline">
              ➕ Create a new service
            </Link>
            <Link to="/my-services" className="text-blue-600 underline block">
              🛠️ Manage my services
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
