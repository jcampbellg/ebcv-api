const express = require('express');
const router = express.Router();
const User = require('../../db/userModel');
const moment = require('moment');
const auth = require('../../auth');

router.get('/', auth, (req, res) => {
  const userId = req.body.userId;
  User.findOne({'_id': userId}, (err, user) => {
    if (err) {
      res.status(400).send({message: 'No hay usuario con ese Id'});
    } else {
      res.json(user);
    }
  })
});

module.exports = router;