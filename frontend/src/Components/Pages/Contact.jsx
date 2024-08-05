import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Animate the form and contact details with stagger effect
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      detailsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://brandpull-1.onrender.com/api/contact', formData);
      setStatusMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatusMessage('Failed to send message.');
      console.error(error);
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title" ref={titleRef}>Contact Us</h1>
      <div className="contact-info">
        <div className="contact-form" ref={formRef}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>

            <button type="submit">Send Message</button>
          </form>
          {statusMessage && <p>{statusMessage}</p>}
        </div>
        <div className="contact-details" ref={detailsRef}>
          <h2>Contact Information</h2>
          <p><i className="fas fa-map-marker-alt"></i> 123 Street, City, Country</p>
          <p><i className="fas fa-phone-alt"></i> +123 456 7890</p>
          <p><i className="fas fa-envelope"></i> info@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
