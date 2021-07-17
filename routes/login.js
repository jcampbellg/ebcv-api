const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const User = require('../db/userModel');
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/login', (req, res) => {
  const code = uniqid();
  const email = req.body.email;
  const msg = {
    to: email,
    from: 'jc.campbellg@gmail.com',
    subject: 'Bienvenido a EBC Virtual',
    text: `Codigo de entrar: ${code}`,
  };
  const userData = {
    email: email,
    code: {
      time: code,
      expire: moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
    }
  };

  User.findOneAndUpdate({email: email}, userData, {
    new: true,
    upsert: true,
    runValidators: true
  }, (error) => {
    if (error) {
      res.status(500).send({
        message: 'Error with user',
        error
      });
    } else {
      sgMail.send(msg).then(() => {
        res.json({ message: "Email Sent" });
      }).catch(error => {
        res.status(500).send({
          message: 'Error with email',
          error
        });
      });
    }
  });
});

module.exports = router;