import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
          ReserveHub
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/services" className="navbar-link">Services</Link></li>
        <li><Link to="/reservations" className="navbar-link">Reservations</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar; 