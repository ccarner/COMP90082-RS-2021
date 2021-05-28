const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section');
const auth = require('../middlewares/auth');

// moderator create a section
router.post('/add', auth,sectionController.newAndSave)
// moderator deletes a section
router.delete('/delete', auth, sectionController.deleteSection)


module.exports = router;