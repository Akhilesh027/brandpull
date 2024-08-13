import React, { useState } from 'react';
import './App.css';
import Sidebar from './SidebarCol';
import Header from './Header';
import Dashboard from './Dashboard';

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <div className="main-content">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}

export default Admin;
