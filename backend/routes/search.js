const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/search');
const verify = require('../middlewares/verifyToken');
const auth = require('../middlewares/auth');

/**
 *  description: search, basic
 */
router.get('/query/',auth, SearchController.query);

module.exports = router;