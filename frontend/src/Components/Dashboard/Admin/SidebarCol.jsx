import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebars">
      <div className="sidebar-header">Admin Ecommerce</div>
      <ul className="sidebar-menu">
        <li className='list'>Dashboard</li>
        <li className='list'>Products</li>
        <li className='list'>Orders</li>
        <li className='list'>Customers</li>
        <li className='list'>Statistics</li>
        <li className='list'>Reviews</li>
        <li className='list'>Transactions</li>
        <li className='list'>Sellers</li>
        <li className='list'>Hot offers</li>
        <li className='list'>Appearance</li>
        <li className='list'>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
