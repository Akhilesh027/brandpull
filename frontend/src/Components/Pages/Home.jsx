import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image from '../Images/image6.jpeg';
import Footer from './Footer';

const Home = () => {
    const backgroundImage = require('../Images/image6.jpeg')
  const reviews = [
    {
      rating: '⭐⭐⭐⭐⭐',
      text: "I absolutely love the Genius Baby music toys! My little one can't get enough of the musical mobile. The soothing melodies help her fall asleep so quickly, and the interactive features keep her entertained for hours. Highly recommend to all parents!",
      name: 'Bannu',
      avatar: image,
    },
    {
      rating: '⭐⭐⭐⭐⭐',
      text: "Genius Baby has truly thought of everything. The baby-friendly instruments are not only safe but also super engaging. My son loves the little drum set and the xylophone. It's amazing to see him develop his sense of rhythm and coordination at such a young age.",
      name: 'Akhileshreddy',
      avatar: image,
    },
  ];

  const benefits = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      subtitle: 'Above $5 Only',
    },
    {
      icon: '🌿',
      title: 'Certified Organic',
      subtitle: '100% Guarantee',
    },
    {
      icon: '💰',
      title: 'Huge Savings',
      subtitle: 'At Lowest Price',
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      subtitle: 'No Questions Asked',
    },
  ];

  const reviewsContainerRef = useRef(null);

  const scrollLeft = () => {
    reviewsContainerRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    reviewsContainerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div id='Home'>
        <div className='imagebox'>
          <img src={image} alt='thubline' className='image' />
        </div>
        <div className='matter'>
          <div className='page'>
            <h3>Best Quality Products</h3>
            <h1>"Nurture Your Little Maestro with Genius Baby Music Products"</h1>
            <p>
              At Genius Baby, we believe that every child is born with an innate potential for
              creativity and learning.
            </p>
            <button className='btn'>
              <Link to='/product' className='Link'>
                shop now
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className='benefits-container'>
        {benefits.map((benefit, index) => (
          <div className='benefit-card' key={index}>
            <div className='icon'>{benefit.icon}</div>
            <div className='text'>
              <h3>{benefit.title}</h3>
              <p>{benefit.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='reviews-section'>
        <h2>Customers Reviews</h2>
        <div className='reviews-container' ref={reviewsContainerRef}>
          <div className='review-card'>
            <div className='rating'>{reviews[0].rating}</div>
            <p className='text'>"{reviews[0].text}"</p>
            <div className='reviewer'>
              <img src={reviews[0].avatar} alt={reviews[0].name} />
              <span>{reviews[0].name}</span>
            </div>
          </div>
          <div className='deal-card'>
            <h3>Deal Of The Day</h3>
            <h1>15% Off On All Products!</h1>
            <p>where the love for music begins.</p>
            <button>Shop Now</button>
          </div>
          <div className='review-card'>
            <div className='rating'>{reviews[1].rating}</div>
            <p className='text'>"{reviews[1].text}"</p>
            <div className='reviewer'>
              <img src={reviews[1].avatar} alt={reviews[1].name} />
              <span>{reviews[1].name}</span>
            </div>
          </div>
        </div>
        <button className='scroll-btn left' onClick={scrollLeft}>
          &#8592;
        </button>
        <button className='scroll-btn right' onClick={scrollRight}>
          &#8594;
        </button>
      </div>
      <div id='footer'>
        <Footer />
      </div>
    </>
  );
};

export default Home;
