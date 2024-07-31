import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';

function admin() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default admin;
