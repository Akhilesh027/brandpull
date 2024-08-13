import React, { useEffect, useState } from 'react';
import SalesStatistics from './SalesStatistics';
import LatestOrders from './LatestOrders';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const salesData = [
    { date: 'Jan', amount: 500 },
    { date: 'Feb', amount: 700 },
    { date: 'Mar', amount: 2600 },
    { date: 'apr', amount: 3600 },
    { date: 'may', amount: 4600 },
    { date: 'jun', amount: 600 },
    // Add more data as needed
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total sales
        const salesResponse = await axios.get('https://brandpull-1.onrender.com/api/sales/total');
        const salesAmount = parseFloat(salesResponse.data.totalSales);
        setTotalSales(salesAmount);

        // Fetch total orders
        const ordersResponse = await axios.get('https://brandpull-1.onrender.com/api/billing');
        const ordersData = ordersResponse.data;
        setOrders(ordersData);
        setTotalOrders(ordersData.length);
        setPendingOrders(ordersData.filter(order => order.status === 'Pending').length);
        setCompletedOrders(ordersData.filter(order => order.status === 'Completed').length);

        // Fetch total products
        const productsResponse = await axios.get('https://brandpull-1.onrender.com/api/products/total');
        // Assuming totalProducts is needed for other purposes
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return '₹0.00';
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat">
          <h3>Total Sales</h3>
          <p>{formatCurrency(totalSales)}</p>
        </div>
        <div className="stat">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="stat">
          <h3>Total Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>
        <div className="stat">
          <h3>Total Completed Orders</h3>
          <p>{completedOrders}</p>
        </div>
      </div>
      <LatestOrders orders={orders} setOrders={setOrders} className='latestorder'/>
    </div>
  );
}

export default Dashboard;
