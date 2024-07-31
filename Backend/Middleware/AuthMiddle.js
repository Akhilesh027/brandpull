// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = 'BANNU9'; // Use an environment variable in production

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided.');

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.');
    req.userId = decoded.id;
    req.userRole = decoded.role; // Add role to the request
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).send('Not authorized.');
  next();
};

module.exports = { verifyToken, isAdmin };
