const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middlewares/auth');
const verify = require('../middlewares/verifyToken');





// user writes a comment
router.post('/add', auth, commentController.NewAndSave)
// user deletes a comment
router.delete('/delete', auth, commentController.deleteComment)
// user gets all his/her comments
router.get('/all',auth, commentController.getAllCommentsOfUser)
// get a comment by ID
router.get('/', commentController.getCommentById)
// user updates a comment
router.patch('/patch', auth, commentController.updateComment)

module.exports = router;