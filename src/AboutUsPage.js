import React from 'react';
import './AboutUsPage.css';
import { FaTruck, FaGlobe, FaHandshake, FaChartLine } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <div className="about-header">
        <h1>About TranspoGo</h1>
        <p>Driving smart logistics with safety, speed, and satisfaction.</p>
      </div>

      <section className="about-section">
        <div className="about-card">
          <FaTruck className="about-icon" />
          <h3>Our Mission</h3>
          <p>
            Deliver efficient and affordable transport solutions across India, prioritizing customer satisfaction and technological innovation.
          </p>
        </div>

        <div className="about-card">
          <FaHandshake className="about-icon" />
          <h3>Our Values</h3>
          <p>
            Integrity, reliability, and customer-first thinking guide every shipment, every time.
          </p>
        </div>

        <div className="about-card">
          <FaGlobe className="about-icon" />
          <h3>Our Coverage</h3>
          <p>
            Connecting metros and remote towns alike, our services span across 15+ states with guaranteed safe delivery.
          </p>
        </div>

        <div className="about-card">
          <FaChartLine className="about-icon" />
          <h3>Innovation</h3>
          <p>
            Real-time tracking, predictive routing, and automated dispatch keep us ahead in logistics technology.
          </p>
        </div>
      </section>

      <section className="about-stats">
        <div className="stat-box">
          <h2>10,000+</h2>
          <p>Deliveries Completed</p>
        </div>
        <div className="stat-box">
          <h2>500+</h2>
          <p>Trusted Clients</p>
        </div>
        <div className="stat-box">
          <h2>100+</h2>
          <p>Fleet Vehicles</p>
        </div>
        <div className="stat-box">
          <h2>4.9★</h2>
          <p>Customer Rating</p>
        </div>
      </section>


      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-box">
          <p>"TranspoGo's service is top-notch. Fast delivery, great tracking and amazing support!"</p>
          <span>- Arjun M., Retailer</span>
        </div>
        <div className="testimonial-box">
          <p>"We’ve used TranspoGo for over a year. Reliable, affordable, and always professional."</p>
          <span>- Neha D., Distributor</span>
        </div>
      </section>

      <div className="about-footer">
        <p>© 2025 TranspoGo. All rights reserved. | Driven by Technology, Delivered with Trust.</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
