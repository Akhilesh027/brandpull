import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';
import image from '../Images/image6.jpeg';
import Footer from './Footer';
import backimage from '../Images/background.png';
import image2 from '../Images/image7.jpeg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const reviewsContainerRef = useRef(null);
  const introRef = useRef(null);
  const productBoxesRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    // Animate the introduction section
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power3.out' }
    );

    // Animate the product boxes with stagger effect
    gsap.fromTo(
      productBoxesRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power3.out', stagger: 0.3 }
    );

    // Animate the reviews section with ScrollTrigger
    gsap.fromTo(
      reviewsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    // Animate the product boxes with ScrollTrigger
    gsap.fromTo(
      productBoxesRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: productBoxesRef.current,
          start: 'top 90%',
          end: 'bottom 30%',
          scrub: true,
        },
      }
    );
  }, []);

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
    {
      rating: '⭐⭐⭐⭐⭐',
      text: "Genius Baby has truly thought of everything. The baby-friendly instruments are not only safe but also super engaging. My son loves the little drum set and the xylophone. It's amazing to see him develop his sense of rhythm and coordination at such a young age.",
      name: 'Akhileshreddy',
      avatar: image,
    },
  ];

  return (
    <>
      <div className="content" ref={introRef}>
        <div className="image">
          <img src={backimage} alt="background" />
        </div>
      </div>

      <div className='product'>
        <div className='text'>
          <h2>Our product</h2>
          <p>GENIUS BABY AUDIO DEVICE</p>
        </div>
      </div>

      <div id='Home' ref={productBoxesRef}>
        <div className='imagebox'>
          <img src={image} alt='thumbnail' className='image' />
          <div className='hover-content'>
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
        <div className="imagebox2">
          <img src={image2} alt="box" className='image2'/>
          <div className='hover-content'>
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
      </div>

      <div className='reviews-section' ref={reviewsRef}>
        <h2>Customers Reviews</h2>
        <div className='reviews-container' ref={reviewsContainerRef}>
          {reviews.map((review, index) => (
            <div className='review-card' key={index}>
              <div className='rating'>{review.rating}</div>
              <p className='text'>"{review.text}"</p>
              <div className='reviewer'>
                <img src={review.avatar} alt={review.name} />
                <span>{review.name}</span>
              </div>
            </div>
          ))}
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
