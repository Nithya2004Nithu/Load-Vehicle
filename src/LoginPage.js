import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [activeView, setActiveView] = useState('user');
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ user: false, admin: false });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    
    // Check if there's a remembered user
    const savedUser = localStorage.getItem('rememberedUser');
    if (savedUser) {
      const { username } = JSON.parse(savedUser);
      setUserUsername(username);
      setRememberMe(true);
    }
    
    return () => {
      document.body.style = '';
    };
  }, []);

  const handleLogin = (type) => async (e) => {
    e.preventDefault();
    const username = type === 'user' ? userUsername : adminUsername;
    const password = type === 'user' ? userPassword : adminPassword;

    if (!username || !password) {
      alert('❌ Please fill all fields.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: type
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save token
        localStorage.setItem('token', data.token);
        
        // If remember me is checked, store the username
        if (type === 'user' && rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ username }));
        } else if (type === 'user' && !rememberMe) {
          localStorage.removeItem('rememberedUser');
        }
        
        alert(`✅ ${data.message}`);
        
        if (type === 'admin') {
          navigate('/admin');
        } else {
          navigate('/services');
        }
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (type) => {
    setShowPassword((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="login-page">
      <div className="login-toggle-bar">
        <button
          className={activeView === 'user' ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setActiveView('user')}
        >
          🚚 User Login
        </button>
        <button
          className={activeView === 'admin' ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => setActiveView('admin')}
        >
          ⚙️ Admin Login
        </button>
      </div>

      <div className="login-container">
        {activeView === 'user' ? (
          <div className="login-section user-bg">
            <div className="login-box">
              <h1>Welcome Back to TranspoGo</h1>
              <p>Sign in to continue your journey</p>
              <form onSubmit={handleLogin('user')}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={userUsername}
                    onChange={(e) => setUserUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="password-field">
                    <input
                      type={showPassword.user ? 'text' : 'password'}
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <span onClick={() => togglePasswordVisibility('user')}>
                      {showPassword.user ? '👁️' : '👁️‍🗨️'}
                    </span>
                  </div>
                </div>
                <div className="form-options">
                  <label>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forget')}
                    className="link-btn"
                  >
                    Forgot Password?
                  </button>
                </div>
                <button className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className="signup-link">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="link-btn"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="login-section admin-bg">
            <div className="login-box">
              <h1>Admin Portal</h1>
              <p>Authorized personnel only</p>
              <form onSubmit={handleLogin('admin')}>
                <div className="form-group">
                  <label>Admin Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Admin username"
                  />
                </div>
                <div className="form-group">
                  <label>Admin Password</label>
                  <div className="password-field">
                    <input
                      type={showPassword.admin ? 'text' : 'password'}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Admin password"
                    />
                    <span onClick={() => togglePasswordVisibility('admin')}>
                      {showPassword.admin ? '👁️' : '👁️‍🗨️'}
                    </span>
                  </div>
                </div>
                <button className="submit-btn" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Admin Login'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;