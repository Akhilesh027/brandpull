import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BillingForm.css";
import razorpay from '../Images/razorpay.png';
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; // Use useNavigate hook for navigation

const BillingForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('check');
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://brandpull-1.onrender.com/cart");
        setCartItems(response.data);
      } catch (err) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    townCity: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
    paymentMethod: "Check payments",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save billing details
      await axios.post("https://brandpull-1.onrender.com/api/saveBillingDetails", formData);

      // Prepare order details
      const orderDetails = {
    
        amount: cartItems.reduce(
          (total, item) => total + item.productPrice * item.quantity,
          0
        ),
        status: "Pending",
      };

      // Save order details
      await axios.post("https://brandpull-1.onrender.com/api/orders", orderDetails);

      // Redirect and alert
      navigate("/Home");
      alert("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Error placing the order. Please try again.");
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="billing-form">
        <div className="billing-data">
          <div className="billing-details">
            <h2>Billing details</h2>
            <label>First name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <label>Last name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <label>Company name (optional)</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

            <label>Country / Region *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />

            <label>Street address *</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />

            <label>Town / City *</label>
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleChange}
              required
            />

            <label>State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <label>PIN Code *</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />

            <label>Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Email address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order-details">
            <h2>Your order</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="order-summary">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div>
                      {item.productName} × {item.quantity}
                    </div>
                    <div>₹{item.productPrice * item.quantity}</div>
                  </div>
                ))}
                <div className="order-shipping">
                  <div>Shipping</div>
                  <div>Free shipping</div>
                </div>
                <div className="order-total">
                  <div>Total</div>
                  <div>₹{totalAmount}</div>
                </div>
              </div>
            )}

            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#FFF4EF' }}>
              <h3>Payment Options</h3>
              <form className="form">
                <div className="box">
                  <input
                    type="radio"
                    id="check"
                    className="radio"
                    name="paymentMethod"
                    value="check"
                    checked={paymentMethod === 'check'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="check">Check payments</label>
                </div>
                {paymentMethod === 'check' && (
                  <div style={{ marginLeft: '20px', backgroundColor: '#e9f7e9', padding: '10px' }}>
                    Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
                  </div>
                )}
               
                <div className="box">
                  <input
                    type="radio"
                    id="cod"
                    className="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="cod">Cash on delivery</label>
                </div>
                {paymentMethod === 'cod' && (
                  <div style={{ marginLeft: '20px', backgroundColor: '#e9f7e9', padding: '10px' }}>
                    Pay with cash upon delivery.
                  </div>
                )}
                
                <div className="box">
                  <input
                    type="radio"
                    id="online"
                    className="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="online">Credit Card/Debit Card/NetBanking</label>
                </div>
                {paymentMethod === 'online' && (
                  <div style={{ marginLeft: '20px', padding: '10px', display: 'flex' }}>
                    <img
                      src={razorpay}
                      alt="Pay by Razorpay"
                      style={{ height: '30px' }}
                    />
                    <p style={{ paddingLeft: '10px' }}>razorpay</p>
                  </div>
                )}
              </form>
              <p>
                Your personal data will be used to process your order, support your experience throughout this website,
                and for other purposes described in our <a href="/privacy-policy">privacy policy</a>.
              </p>
            </div>

            <button className="Billingbtn" type="submit">
              Place order
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default BillingForm;
