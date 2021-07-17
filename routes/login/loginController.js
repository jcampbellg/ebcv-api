const express = require('express');
const router = express.Router();

// /login
router.use('/', require('./index'));
// /login/validate
router.use('/validate', require('./validate'));

module.exports = router;