const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'u796656751_geniusBaby', // Database name
  'u796656751_BrandPull', // Database user
  'BABY@2004a', // Database password
  {
    host: '193.203.166.104', // Database host
    dialect: 'mysql', // Dialect (e.g., 'mysql', 'postgres', 'sqlite', etc.)
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
module.exports = sequelize;
