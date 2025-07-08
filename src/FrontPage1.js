import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontPage1.css';

const FrontPage1 = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="front-page">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className={`overlay ${isVisible ? 'visible' : ''}`}>
        <nav className="navbar">
          <div className="logo">
            <span className="logo-icon">🚚</span> 
            TranspoGo
          </div>
          

        </nav>

        <div className="content">
          <h1 className="title">Welcome to <span>TranspoGo</span></h1>
          <div className="highlight-bar"></div>
          <p className="subtitle">Your trusted goods transport solution across the country.</p>
          
          <div className="features">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <div className="feature-text">Fast Delivery</div>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <div className="feature-text">Safe Transport</div>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <div className="feature-text">Real-time Tracking</div>
            </div>
          </div>
          
          <button className="get-started-btn" onClick={() => navigate('/home')}>
            Get Started
            <svg className="arrow-right" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        
        <div className="footer">
          <p>© 2025 TranspoGo. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default FrontPage1;