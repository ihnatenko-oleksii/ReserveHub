import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav className="bg-gray-100 p-4 shadow flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="text-blue-600 hover:underline">
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>

        {user && (
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        )}
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
