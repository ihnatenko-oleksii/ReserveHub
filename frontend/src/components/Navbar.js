import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
        <li><Link to="/" style={{ color: 'white' }}>Home</Link></li>
        <li><Link to="/services" style={{ color: 'white' }}>Services</Link></li>
        <li><Link to="/reservations" style={{ color: 'white' }}>Reservations</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar; 