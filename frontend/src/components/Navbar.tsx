import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const initials = user?.firstName?.[0] || '?';
  const avatarUrl = `http://localhost:8080/avatars/${user?.avatarUrl}`;

  const [query, setQuery] = useState('');
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      {/* Верхній рядок */}
      <div className="navbar-top">
        <div className="navbar-left mr-2">
            <Link to="/" className="navbar-link">
              <img src="/logo.png" alt="logo" className="navbar-logo" />
            </Link>
          {user && (
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
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
          <Link to={`/services?text=${encodeURIComponent(query)}`} className="navbar-link navbar-icon ml-3 mt-2 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="gray"
            viewBox="0 0 16 16"
            className=""
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          </Link>
          
        </div>


        <div className="navbar-right">
          {!user ? (
            <>
              <Link to="/login" className="navbar-link">Log in</Link>
              <Link to="/register" className="navbar-link">Sign up</Link>
            </>
          ) : (
            <div className="navbar-user">
              {user.avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="navbar-avatar"
                />
              ) : (
                <div className="navbar-avatar-fallback">{initials}</div>
              )}
              <div className="navbar-user-info">
                {/* <span className="navbar-name">
                  
                </span> */}
                <Link to="/dashboard" className="navbar-manage">{user.firstName} {user.lastName}</Link>
                <button onClick={handleLogout} className="navbar-logout">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(location.pathname === '/' || location.pathname === '/services') && (
          <div className="navbar-categories-container">
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
