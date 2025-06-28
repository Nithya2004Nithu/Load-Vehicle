import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert('Please write your feedback before submitting.');
    } else {
      navigate('/success');
    }
  };

  return (
    <div className="feedback-container">
      <h1>We Value Your Feedback</h1>
      <p>Let us know your thoughts about our service.</p>
      <textarea
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button className="btn-custom" onClick={handleSubmit}>
        Submit
      </button>
      <button className="btn-custom btn-back" onClick={() => navigate('/payment')}>
        Back
      </button>
    </div>
  );
};

export default FeedbackPage;
