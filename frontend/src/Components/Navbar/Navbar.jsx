import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from '../Images/logo.jpeg';
import Cart from "../Pages/Cart";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
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
        const response = await axios.get(
          "https://brandpull-1.onrender.com/api/user/details",
          config
        );
        setCurrentUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          setError("Invalid token or token expired");
        } else {
          setError("Failed to fetch user data");
        }
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to='/Home'><img src={logo} alt="logo" width={80} height={80} /></Link>
      </div>
      {!currentUser || currentUser.role !== 'admin' ? (
        <div className="Links">
          <Link to='/Home' className="AboutLink">Home</Link>
          <Link to='/about' className="AboutLink">About</Link>
        </div>
      ) : null}
      <div className="auth">
        {loading && <p>Loading...</p>}
        {isAuthenticated ? (
          <div className="auth">
            {/* Conditionally render the shopping bag icon and quantity span */}
            {currentUser.role !== 'admin' && (
              <>
                <FontAwesomeIcon icon={faBagShopping} id='bagicon' onClick={toggleSidebar} />
                <span className='increment'>{totalQuantity}</span>
              </>
            )}
            <Link className="Link" to="/profile">
              <p>{currentUser.username[0]}</p>
            </Link>
            <Link className="Link" to='/login'>
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button>login</button>
          </Link>
        )}
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Cart</h2>
        <div>
          <Cart onClose={closeSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
