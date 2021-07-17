const express = require('express');
const router = express.Router();

const loginController = require('./login/loginController');

router.use('/login', loginController);

router.get('/', (req, res, next) => {
  res.json({ message: 'Hey! This is your server response!' });
  next();
});

module.exports = router;