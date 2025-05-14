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
          <Link to="/" className="text-blue-600 hover:underline font-semibold">
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
          <div className="flex items-center gap-4">
            {/* ✅ Avatar or fallback */}
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
                {user.firstName?.[0] || '?'}
              </div>
            )}

            {/* 👤 Full name */}
            <span className="text-gray-800 text-sm font-medium">
              {user.firstName} {user.lastName}
            </span>

            {/* 🔴 Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
