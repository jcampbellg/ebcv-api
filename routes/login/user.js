const express = require('express');
const router = express.Router();
const User = require('../../db/userModel');
const moment = require('moment');
const auth = require('../../auth');

router.get('/', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;