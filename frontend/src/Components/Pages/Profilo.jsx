import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); // State to store user orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Fetch user details
        const userResponse = await axios.get('https://brandpull-1.onrender.com/api/user/details', config);
        setUser(userResponse.data);

        // Fetch user orders
        const ordersResponse = await axios.get('https://brandpull-1.onrender.com/api/orders', config);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          {user && (
            <div className="user-details">
              <h2>Username: {user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          )}

          <div className="orders-section">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
              <p>You have not placed any orders.</p>
            ) : (
              <ul>
                {orders.map(order => (
                  <li key={order._id}>
                    <p>Order ID: <span>{order.id}</span></p>
                    <p>Total: ₹<span>{order.amount}</span></p>
                    <p>Status: <span>{order.status}</span></p>
                    <p>Date: <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
