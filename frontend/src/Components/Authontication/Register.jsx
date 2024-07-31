"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Added the role state
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/register", {
        username: username,
        email: email,
        password: password,
        role: role, 
      });
      alert("Registration successful");
      window.location.href = '/login'
      // Handle successful registration (e.g., display success message, redirect to login page)
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error (e.g., display error message to the user)
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
        <p>If you have already registered, please <Link to='/login'>login</Link>.</p>
      </form>
    </div>
  );
};

export default RegisterPage;
