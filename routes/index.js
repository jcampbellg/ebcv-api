const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'Hey! This is your server response!' });
  next();
});

module.exports = router;