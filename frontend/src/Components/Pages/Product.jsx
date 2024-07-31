import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductImage from '../Images/image3.jpeg';
import './Product.css';
import Footer from './Footer';

const Product = ({ initialQuantity = 1, productId }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5001/add', {
        productId,
        productName: product.name,
        productPrice: product.price,
        quantity
      });
      alert('Product added to cart successfully!');
      window.location.href = '/product'
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <>
    <div id='product'>
      <div className="product-image ">
        <img src={ProductImage} alt='product' className='image'/>
      </div>
      <div className='description'>
        <div>
          <h2>{product.name}</h2>
          <h3>₹{product.price} + Free Shipping</h3>
          <p>Our interactive music toys and instruments are perfect for engaging your baby’s senses. With bright colors, varied textures, and delightful sounds, they offer a multi-sensory experience that promotes sensory development and fine motor skills.</p>
          <div className='incre'>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <div>
              <button className='pbtn' onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
  </>
  );
}

export default Product;
