import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontPage.css';

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      <div className="overlay">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">TranspoGo</div>
          <div className="nav-links">
            <button className="nav-btn" onClick={() => navigate('/home')}>Home</button>
            <button className="nav-btn" onClick={() => navigate('/track')}>Track Shipment</button>
            <button className="nav-btn" onClick={() => navigate('/services')}>Services</button>
            <button className="nav-btn" onClick={() => navigate('/about')}>About Us</button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="content">
          <h1 className="title">Welcome to <span>TranspoGo</span></h1>
          <p className="subtitle">Your trusted goods transport solution across the country.</p>
          <button className="start-btn" onClick={() => navigate('/booking')}>
            Start Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
