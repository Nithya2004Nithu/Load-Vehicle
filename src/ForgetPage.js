import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgetPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (email) {
      alert('✅ A password reset link has been sent to your email!');
      navigate('/login');
    } else {
      alert('⚠️ Please enter your registered email.');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Your Password?</h2>
        <p style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleReset} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.resetBtn}>Send Reset Link</button>
        </form>
        <button onClick={() => navigate('/login')} style={styles.backBtn}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  background: {
    background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    animation: 'fadeIn 0.6s ease-in-out',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#555',
    fontSize: '14px',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '8px 12px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    color: '#0077ff',
    marginRight: '10px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'transparent',
  },
  resetBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0077ff',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  backBtn: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
};

export default ForgetPage;
