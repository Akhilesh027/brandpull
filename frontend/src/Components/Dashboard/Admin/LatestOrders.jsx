import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LatestOrders.css'; // Ensure you add appropriate styles in this CSS file

function LatestOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleMarkAsCompleted = async (orderId) => {
    try {
      // API call to update order status to 'Completed'
      await axios.patch(`http://localhost:5001/api/orders/${orderId}`, {
        status: 'Completed',
      });

      // Update local state to reflect the change
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: 'Completed' }
            : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="latest-orders">
      <h2>Latest Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>₹{order.amount.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>{order.userId}</td>
              <td>
                {order.status !== 'Completed' && (
                  <button
                    onClick={() => handleMarkAsCompleted(order.id)}
                    className="mark-completed-btn"
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestOrders;
