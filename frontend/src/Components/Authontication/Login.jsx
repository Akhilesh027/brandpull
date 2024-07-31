import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '15px',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username,
        password,
      });
      const { token, role } = response.data;
      localStorage.setItem('token', token); 
      if (role === 'user') {
        window.location.href = '/user-dashboard'; 
      } else if (role === 'admin') {
        window.location.href ='/admin-dashboard'; 
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      {error && <div style={errorStyle}>{error}</div>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
        required
      />
      <button type="submit" style={buttonStyle}>Login</button>
      <p>If you're new to the site, register here <Link to='/register'>Register</Link></p>
    </form>
  );
};

export default LoginForm;
