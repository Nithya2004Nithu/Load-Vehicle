import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const emojiBurst = document.getElementById('emoji-burst');
    if (emojiBurst) {
      emojiBurst.classList.add('burst');
      setTimeout(() => {
        emojiBurst.classList.remove('burst');
      }, 1500);
    }
  }, []);

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div id="emoji-burst">🎉🎉🎉</div>
        <h1>Payment Successful!</h1>
        <p>Your booking has been confirmed. Thank you for using our service.</p>
        <button className="button home-button" onClick={() => navigate('/')}>
          Return to Home
        </button>
        <button className="button feedback-button" onClick={() => navigate('/feedback')}>
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
