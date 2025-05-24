import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const initials = user?.firstName?.[0] || '?';
  const avatarUrl = `http://localhost:8080/avatars/${user?.avatarUrl}`;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      {/* Верхній рядок */}
      <div className="navbar-top">
        <div className="navbar-left">
          <img src="/logo.png" alt="logo" className="navbar-logo" />
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
            className="navbar-search-input"
          />
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
                <span className="navbar-name">
                  {user.firstName} {user.lastName}
                </span>
                <Link to="/profile" className="navbar-manage">Manage Profile</Link>
                <button onClick={handleLogout} className="navbar-logout">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Нижній рядок */}
      <div className="navbar-categories-container">
        {categories.map((cat) => (
          <div key={cat.name} className="navbar-category-card">
            <img src={cat.icon} alt={cat.name} className="navbar-category-icon" />
            <span className="navbar-category-label">{cat.name}</span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
