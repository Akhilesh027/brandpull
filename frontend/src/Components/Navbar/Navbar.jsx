import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from '../Images/logo.jpeg';
import Cart from "../Pages/Cart";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to='/Home'><img src={logo} alt="logo" width={80} height={80} /></Link>
      </div>
      <FontAwesomeIcon icon={faBars} className="hamburger" onClick={toggleMobileMenu} />
      <div className={`Links ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="authlinks">
          <Link to='/Home' className="AboutLink" onClick={handleLinkClick}>Home</Link>
          <Link to='/about' className="AboutLink" onClick={handleLinkClick}>About</Link>
        </div>
        <div className="auth">
          {/* Always show cart icon and quantity unless the user is an admin */}
          {(!isAuthenticated || (currentUser && currentUser.role !== 'admin')) && (
            <div className="mobileCart">
              <FontAwesomeIcon icon={faBagShopping} id='bagicon' onClick={toggleSidebar} />
              <span className='increment'>{totalQuantity}</span>
            </div>
          )}
          {isAuthenticated ? (
            <>
              <Link className="Link" to="/profile" onClick={handleLinkClick}>
                <p>{currentUser.username[0]}</p>
              </Link>
              <Link className="Link" to='/login' onClick={handleLogout}>
                <button>Logout</button>
              </Link>
            </>
          ) : (
            <Link to="/login" onClick={handleLinkClick}>
              <button>Login</button>
            </Link>
          )}
        </div>
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
