const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

// login page
router.post('', auth.userLogin);

module.exports = router;