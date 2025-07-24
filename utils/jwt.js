const jwt = require('jsonwebtoken');

function createJWT(payload) {
  return jwt.sign(payload, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkTnVtYmVyIjoiQ0FSRDEyMzQ1NiIsImlhdCI6MTc1MzIwNjgwOCwiZXhwIjoxNzUzMjEwNDA4fQ.JBCj5Ze1Fw8W9hOAQBYGhID5_jCV6CROrNtUM7e6egE", { expiresIn: '1h' });
}

function verifyJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkTnVtYmVyIjoiQ0FSRDEyMzQ1NiIsImlhdCI6MTc1MzIwNjgwOCwiZXhwIjoxNzUzMjEwNDA4fQ.JBCj5Ze1Fw8W9hOAQBYGhID5_jCV6CROrNtUM7e6egE");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { createJWT, verifyJWT };