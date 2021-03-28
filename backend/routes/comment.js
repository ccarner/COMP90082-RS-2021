const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment')
const verify = require('../middlewares/verifyToken');





// user writes a comment
router.post('/add', verify.verify, commentController.NewAndSave)
// user deletes a comment
router.delete('/delete', verify.verify, commentController.deleteComment)
// user gets all his/her comments
router.get('/all',verify.verify, commentController.getAllCommentsOfUser)
// get a comment by ID
router.get('/', commentController.getCommentById)
// user updates a comment
router.patch('/patch', verify.verify, commentController.updateComment)

module.exports = router;