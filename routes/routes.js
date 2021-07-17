const express = require('express');
const router = express.Router();

router.get('/', require('./index'));
router.post('/login', require('./login'));

module.exports = router;