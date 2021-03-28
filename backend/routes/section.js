const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section')
const verify = require('../middlewares/verifyToken');





// moderator create a section
router.post('/add', verify.verify,sectionController.newAndSave)
// moderator deletes a section
router.delete('/delete', verify.verify, sectionController.deleteSection)


module.exports = router;