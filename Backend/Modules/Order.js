// models/order.js
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path as needed

const Order = sequelize.define('Order', {
  // Remove the foreign key and primary key constraints
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: true, // Include timestamps if needed (createdAt and updatedAt)
  // You may specify `paranoid: true` if you want soft deletes (deletedAt)
});

// Synchronize the model with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & order table created!');
  })
  .catch(error => {
    console.error('Error creating order table:', error);
  });

module.exports = Order;
