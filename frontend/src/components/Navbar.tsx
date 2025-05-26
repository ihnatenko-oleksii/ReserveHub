import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/navbar.css';

const categories = [
  { name: 'HAIRDRESSING', icon: '/icons/hairdressing.png' },
  { name: 'BEAUTY', icon: '/icons/beauty.png' },
  { name: 'MASSAGE', icon: '/icons/massage.png' },
  { name: 'FITNESS', icon: '/icons/fitness.png' },
  { name: 'EDUCATION', icon: '/icons/education.png' },
  { name: 'CONSULTING', icon: '/icons/consulting.png' },
  { name: 'OTHER', icon: '/icons/other.png' },
];

interface Notification {
  id: number;
  content: string;
  link: string;
  createdAt: string;
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initials = user?.firstName?.[0] || '?';
  const avatarUrl = `http://localhost:8080/avatars/${user?.avatarUrl}`;

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get<Notification[]>('/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };
    fetchNotifications();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <header className="navbar">
        <div className="navbar-top">
          <div className="navbar-left mr-2">
            <Link to="/" className="navbar-logo-link">
              <img src="/logo.png" alt="logo" className="navbar-logo" />
            </Link>
            <Link to="/" className="navbar-link">Main page</Link>
            {user && (
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            )}
          </div>

          <div className="navbar-search">
            <input
                type="text"
                placeholder="Search services or categories..."
                className="navbar-search-input pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Link
                to={`/services?text=${encodeURIComponent(query)}`}
                className="navbar-link navbar-icon ml-3 mt-2 mr-3"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="gray"
                  viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Link>
          </div>

          <div className="navbar-right relative">
            {user && (
                <div className="relative mr-2">
                  <button
                      onClick={() => setShowNotifications((prev) => !prev)}
                      className="text-gray-600 hover:text-black hover:bg-gray-200 relative cursor-pointer rounded-full transition duration-200 bg-gray-100 p-2 mt-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                  </button>

                  {showNotifications && (
                      <div className="absolute right-0 mt-2 w-85 bg-white rounded-lg shadow-lg z-50" style={{ border: '1px solid #e5e7eb' }}>
                        <div className="p-3 border-b border-b-gray-400 font-semibold text-gray-700">Notifications</div>
                        <ul className="max-h-64 overflow-y-auto">
                          {notifications.length === 0 ? (
                              <li className="p-3 text-sm text-gray-500 text-center">No notifications</li>
                          ) : (
                              notifications.map((n) => (
                                  <li
                                      key={n.id}
                                      onClick={() => navigate(`${n.link}`)}
                                      className="flex flex-col gap-1 p-3 hover:bg-blue-50 cursor-pointer border-b border-b-gray-400 text-sm transition-all"
                                  >
                                    <span className="text-gray-800">{n.content}</span>
                                    <span className="text-xs text-gray-500">{n.createdAt ? new Date(n.createdAt).toLocaleString() : 'Just now'}</span>
                                  </li>
                              ))
                          )}
                        </ul>
                        <div className="p-2 text-center">
                          <button
                              className="text-blue-600 hover:underline text-sm cursor-pointer"
                              onClick={() => navigate('/notifications')}
                          >
                            All notifications →
                          </button>
                        </div>
                      </div>
                  )}
                </div>
            )}

            {!user ? (
                <>
                  <Link to="/login" className="navbar-link">Log in</Link>
                  <Link to="/register" className="navbar-link">Sign up</Link>
                </>
            ) : (
                <div className="navbar-user">
                  {user.avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" className="navbar-avatar" />
                  ) : (
                      <div className="navbar-avatar-fallback">{initials}</div>
                  )}
                  <div className="navbar-user-info">
                    <Link to="/dashboard" className="navbar-manage">{user.firstName} {user.lastName}</Link>
                    <button onClick={handleLogout} className="navbar-logout">Logout</button>
                  </div>
                </div>
            )}
          </div>
        </div>

        {(location.pathname === '/' || location.pathname === '/services') && (
            <div className="navbar-categories-container">
              <Link
                      key="All"
                      to={`/services`}
                      className="navbar-category-card"
                  >
                    <img src="/icons/all.png" alt="All" className="navbar-category-icon" style={{width: "60px", height: "60px", marginBottom: "-6px"}}/>
                    <span className="navbar-category-label">All</span>
                  </Link>
              {categories.map((cat) => (  
                  <Link
                      key={cat.name}
                      to={`/services?category=${encodeURIComponent(cat.name)}`}
                      className="navbar-category-card"
                  >
                    <img src={cat.icon} alt={cat.name} className="navbar-category-icon" />
                    <span className="navbar-category-label">{cat.name}</span>
                  </Link>
              ))}
            </div>
        )}
      </header>
  );
};

export default Navbar;
