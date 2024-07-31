// models/index.js
const User = require('./auth');
const Product = require('./Product');
const Cart = require('./Cart');
const Order = require('./Order');

// Define relationships
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

// Export models
module.exports = {
  User,
  Product,
  Cart,
  Order,
};
