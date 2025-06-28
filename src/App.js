// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all the page components
import FrontPage1 from './FrontPage1';
import FrontPage from './FrontPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AboutUsPage from './AboutUsPage';
import ServicesPage from './ServicesPage';
import BookingPage from './BookingPage';
import PaymentPage from './PaymentPage';
import ConfirmationPage from './ConfirmationPage';
import FeedbackPage from './FeedbackPage';
import SuccessPage from './SuccessPage';
import ForgetPage from './ForgetPage';
import TrackShipmentPage from './TrackShipmentPage';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage1 />} />
      <Route path="/front" element={<FrontPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/forget" element={<ForgetPage />} />
      <Route path="/track" element={<TrackShipmentPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;