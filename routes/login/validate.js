const express = require('express');
const router = express.Router();
const User = require('../../db/userModel');
const moment = require('moment');

router.post('/', (req, res) => {
  const code = req.body.code;

  User.findOne({'code.time': code}, (err, user) => {
    if (err) {
      res.status(400).send({message: 'Codigo Invalido'});
    } else {
      const isExpire = moment(user.code.expire).isAfter(moment());

      if (isExpire) {
        res.status(400).send({message: 'Codigo Vencido'});
      } else {
        res.json(user);
      }
    }
  })
});

module.exports = router;