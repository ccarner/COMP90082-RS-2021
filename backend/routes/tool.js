const express = require('express');
const router = express.Router();
const toolController = require('../controllers/tool')
const verify = require('../middlewares/verifyToken');
const subject = require('../models/subject');
const auth = require('../middlewares/auth');



// moderator creates a tool
router.post('/add', auth,toolController.NewAndSave)
// moderator deletes a tool
router.delete('/delete', auth, toolController.deleteTool)
// user gets all tools
router.get('/all', toolController.getAllTools)
// user search a tool
router.get('/search', toolController.getToolByName)
// user gets a tool
router.get('/:name', toolController.getToolByName)
// user gets a tool
router.get('/', toolController.getToolById)
// moderator updates a tool
router.patch('/patch', auth, toolController.updateTool)

module.exports = router;