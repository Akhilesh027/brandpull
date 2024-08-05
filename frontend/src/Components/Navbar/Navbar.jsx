import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from '../Images/logo.jpeg';
import Cart from "../Pages/Cart";
import gsap from 'gsap';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const sidebarRef = useRef(null);
  const cartItemsRef = useRef(null);

  useEffect(() => {
    // GSAP animations for logo, links, sidebar, and cart items
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 2, 
          ease: 'power2.out'
        }
      );
    }

    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0, y: -50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 2, 
          ease: 'power2.out',
          delay: 0.2
        }
      );
    }

    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { y: '-100%', opacity: 0 },
        { 
          y: 0, 
          opacity: 2, 
          duration: 2, 
          ease: 'power2.out'
        }
      );
    }

    if (cartItemsRef.current) {
      gsap.fromTo(
        cartItemsRef.current,
        { y: '-100%', opacity: 0 },
        { 
          y: 0, 
          opacity: 2, 
          duration: 2, 
          ease: 'power2.out'
        }
      );
    }

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
      <div className="logo" ref={logoRef}>
        <Link to='/Home'><img src={logo} alt="logo" width={80} height={80} /></Link>
      </div>
      <FontAwesomeIcon icon={faBars} className="hamburger" onClick={toggleMobileMenu} />
      <div className={`Links ${isMobileMenuOpen ? 'open' : ''}`} >
        <div className="authlinks" ref={linksRef}>
          <Link to='/Home' className="AboutLink" onClick={handleLinkClick}>Home</Link>
          <Link to='/about' className="AboutLink" onClick={handleLinkClick}>About</Link>
          <Link to='/product' className="AboutLink" onClick={handleLinkClick}>Product</Link>
          <Link to='/contact' className="AboutLink" onClick={handleLinkClick}>Contact Us</Link>
        </div>
        <div className="auth">
          <div className="mobileCart" ref={cartItemsRef}>
            <FontAwesomeIcon icon={faBagShopping} id='bagicon' onClick={toggleSidebar} />
            <span className='increment'>{totalQuantity}</span>
          </div>
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
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
