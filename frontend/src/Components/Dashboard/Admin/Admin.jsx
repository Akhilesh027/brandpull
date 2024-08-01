import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <div className="main-content">
        <Header />
        <Dashboard />
      </div>
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>
    </div>
  );
}

export default Admin;
