import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import image from '../Images/image6.jpeg';
import { Link } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://brandpull-1.onrender.com/cart');
        setCartItems(response.data);
      } catch (err) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (productIdnum) => {
    try {
      await axios.delete(`https://brandpull-1.onrender.com/api/cart/${productIdnum}`);
      setCartItems(cartItems.filter(item => item.productIdnum !== productIdnum));
      alert('Item deleted successfully');
      window.location.href = '/product'
    } catch (error) {
      console.error('Error deleting cart item:', error);
      alert('Error deleting cart item');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id='cart'>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          <div className="cartpage">
            {cartItems.map(item => (
              <React.Fragment key={item._id}>
                <li>
                  <div className="img">
                    <img src={image} alt="product" className='cartimage' />
                  </div>
                  <div className="price">
                    <p>{item.productName}</p>
                    <p>₹{item.productPrice}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <button className='delete-btn' onClick={() => handleDelete(item.productId)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </li>
                <div className='down'>
                  <p>Total: ₹{item.productPrice * item.quantity}</p>
                  <button className='cartbtn' onClick={onClose}>
                    <Link className='Link' to={`/product/${item._id}`}>View cart</Link>
                  </button>
                  <button className='cartbtn' onClick={onClose}>
                    <Link className='Link' to='/checkout'>Check Out</Link>
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}

export default Cart;
