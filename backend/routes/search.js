const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/search');
const verify = require('../middlewares/verifyToken');


/**
 *  description: search, basic
 */
router.get('/query/',verify.verify, SearchController.query);

module.exports = router;