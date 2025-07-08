import React, { useState } from 'react';
import './TrackShipmentPage.css';

const TrackShipmentPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);

  const handleTrack = () => {
    if (trackingId.trim()) {
      setStatus('In Transit - Expected Delivery: 2 Days');
    } else {
      alert('Please enter a valid tracking ID');
    }
  };

  return (
    <div className="track-bg">
      <div className="track-card">
        <h2>Track Your Shipment</h2>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={handleTrack}>Track</button>
        {status && <p className="status-msg">📦 Status: {status}</p>}
      </div>
    </div>
  );
};

export default TrackShipmentPage;
