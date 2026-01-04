import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
import { API_BASE_URL } from '../config';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login.php`, { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>Admin Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;