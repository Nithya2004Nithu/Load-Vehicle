import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1>Thank You!</h1>
      <p>Your feedback has been successfully submitted.</p>
      <button className="success-button" onClick={() => navigate('/home')}>
        Return to Home
      </button>
    </div>
  );
};

export default SuccessPage;
