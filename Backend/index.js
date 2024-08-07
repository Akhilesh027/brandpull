const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const sequelize = require('./config/db.js');
const User = require('./Modules/auth.js');
const { Cart, Product, Order } = require('../Backend/Modules/combine.js');
const BillingDetails = require('./Modules/billingDetails.js');

require('dotenv').config();

const app = express();
const PORT = process.env.port || 3000 ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('uploads'));

// Register route
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });
    res.status(200).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'BANNU9', { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login error' });
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

  try {
    const decoded = jwt.verify(token, 'BANNU9');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// User details route
app.get('/api/user/details', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users route
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) res.status(200).json(product);
    else res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Cart routes
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.findAll();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});

app.post('/add', async (req, res) => {
  const { productId, quantity, productName, productPrice } = req.body;
  try {
    const [cartItem, created] = await Cart.findOrCreate({
      where: { productId },
      defaults: { quantity, productName, productPrice },
    });

    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }

    res.status(200).json({ message: 'Product added to cart successfully', cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Error adding to cart' });
  }
});

app.delete('/api/cart/:productId', async (req, res) => {
  const productId = 1;
  try {
    // Assuming Cart is a Sequelize model and productId is the field to delete by
    const result = await Cart.destroy({ where: { productId } });
    
    if (result === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Failed to delete cart item' });
  }
});
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

  db.query(query, [name, email, message], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
    res.status(200).send('Message Sent');
  });
});

// Billing details route
app.post('/api/saveBillingDetails', async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    country,
    streetAddress,
    townCity,
    state,
    pinCode,
    phone,
    email,
    paymentMethod,
  } = req.body;

  try {
    const billingDetails = await BillingDetails.create({
      firstName,
      lastName,
      companyName,
      country,
      streetAddress,
      townCity,
      state,
      pinCode,
      phone,
      email,
      paymentMethod,
    });

    res.status(200).json({ message: 'Order placed successfully', billingDetails });
  } catch (error) {
    console.error('Error saving billing details:', error);
    res.status(500).json({ error: 'Error saving billing details' });
  }
});

// Order routes
app.post('/api/orders', async (req, res) => {
  const { amount, status } = req.body;

  // Check if amount and status are provided
  if (amount === undefined || status === undefined) {
    return res.status(400).json({ error: 'Amount and status are required' });
  }

  try {
    const newOrder = await Order.create({
      amount,
      status
    });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});



app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/orders/user', async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Error fetching user orders' });
  }
});
app.get('/api/sales/total', async (req, res) => {
  try {
    const orders = await Order.findAll();
    const totalSales = orders.reduce((total, order) => total + order.amount, 0);
    res.status(200).json({ totalSales });
  } catch (error) {
    console.error('Error fetching total sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get total products
app.get('/api/products/total', async (req, res) => {
  try {
    const totalProducts = await Product.count();
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error('Error fetching total products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.patch('/api/ordered', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  try {
    const [updated] = await Order.update({ status }, {
      where: { id: orderId }
    });
    
    if (updated) {
      const updatedOrder = await Order.findByPk(orderId);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
