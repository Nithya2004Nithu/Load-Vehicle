import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Add admin link for development/demo purposes
    const adminAccessKey = localStorage.getItem('adminAccessKey');
    console.log('Admin access available:', !!adminAccessKey);
  }, []);

  return (
    <div className="homepage-bg">
      <div className={`homepage-container ${isLoaded ? 'fade-in' : ''}`}>
        <div className="logo-container">
          <img src="/img1.png" alt="Truck Icon" className="homepage-icon pulse" />
        </div>
        
        <h1 className="homepage-title">
          Welcome to <span className="highlight-text">TranspoGo</span>
        </h1>
        
        <div className="animated-bar"></div>
        
        <h2 className="homepage-subtitle">Smart Load Vehicle Booking System</h2>
        
        <p className="homepage-description">
          Book your transport vehicles with ease, track your bookings in real-time, 
          and manage your deliveries efficiently — all from one unified platform.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <div className="feature-content">
              <h3>Real-time Tracking</h3>
              <p>Monitor your shipments live on the map</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <div className="feature-content">
              <h3>Easy Booking</h3>
              <p>Book vehicles in just a few clicks</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <div className="feature-content">
              <h3>Affordable Rates</h3>
              <p>Competitive pricing with no hidden fees</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛎️</div>
            <div className="feature-content">
              <h3>24/7 Support</h3>
              <p>Our team is always ready to help you</p>
            </div>
          </div>
        </div>

        <div className="cta-container">
          <button 
            className="homepage-button login-btn" 
            onClick={() => navigate('/login')}
          >
            <span>Login to Continue</span>
            <i className="arrow-icon">→</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;