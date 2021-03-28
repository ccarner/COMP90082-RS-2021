const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const verify = require('../middlewares/verifyToken');
const test = require('../controllers/test');
const CommentController = require('../controllers/comment');

const multer = require('multer');
// homepage
router.get('/home',verify.verify, UserController.getUserHomePage)


// list all users
router.get('/allUsers', UserController.getAllUsers)

router.get('/images', UserController.getAllImages);

// test adding a user 
router.post('/add',verify.verify, UserController.addUser);

router.post('/upload',  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
    'image'
  ),UserController.upload);

router.get('/comments', verify.verify, CommentController.getAllCommentsOfUser)

router.patch('/subscribe', verify.verify, UserController.subscribe_subject)

module.exports = router;