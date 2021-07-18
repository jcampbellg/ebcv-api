const express = require('express');
const router = express.Router();

// /login
router.use('/', require('./index'));
// /login/validate
router.use('/validate', require('./validate'));
// login/user
router.use('/user', require('./user'));

module.exports = router;