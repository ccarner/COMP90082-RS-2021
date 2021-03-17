const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user');



router.post('', UserController.studentRegister);

module.exports = router;