const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const authorizeUser = (req, res, next) => {
  const token = req.query.Authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send('<h1 align="center"> Login to Continue </h1>');
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};
const staticRoutes = [
  '/',
  '/js/login.js',
  'back.jpg',
  '/js/app.js',
  '/dist/login.bundle.js',
  '/dist/app.bundle.js',
];
staticRoutes.forEach(route => {
  app.get(route, (req, res) => {
    const filePath = route === '/' ? 'src/login.html' : `src${route}`;
    res.sendFile(path.join(__dirname, filePath));
  });
});
const protectedRoutes = ['/admin.html', '/index.html'];
protectedRoutes.forEach(route => {
  app.get(route, authorizeUser, (req, res) => {
    const filePath = `src/${route}`;
    res.sendFile(path.join(__dirname, filePath));
  });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
