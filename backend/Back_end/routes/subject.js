const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject')
const verify = require('../middlewares/verifyToken');



// moderator creates a subject
router.post('/add', verify.verify,subjectController.addSubject)
// moderator delete a subject
router.delete('/delete', verify.verify, subjectController.deleteSubject)
// user get all subjects
router.get('/all', subjectController.getAllSubjects)
// user searches a subject
router.get('/search', subjectController.searchSubject)
// usear gets a subject
router.get('/:subject_code', subjectController.getSubjectbyCode)
// user gets a subject
router.get('/', subjectController.getSubjectById)
// moderator updates a subject
router.patch('/patch', verify.verify, subjectController.updateSubject)

module.exports = router;