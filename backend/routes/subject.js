const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');
const {Subject} = require('../models/subject');
const {User} = require('../models/user');
const Joi = require('joi');
const _ = require('lodash');

// moderator creates a subject
// original : router.post('/add', auth, subjectController.addSubject);
async function updateStudentSubjects(newSubject) {
  const subjects = students[0].subscribed_subjects;
  students.forEach(async (student) => {
    await User.findByIdAndUpdate(student._id, {
      subscribed_subjects: [...subjects, newSubject._id],
    });
  });
}

router.post('/add', auth, async (req, res) => {
  const schema = Joi.object().keys({
    subject_code: Joi.string().min(5).max(15).required(),
    name: Joi.string().min(5).max(25).required(),
    description: Joi.string().max(255),
  });
  const {error} = schema.validate(req.body);
  if (error) {
    return res.json({success: false, error_info: error.details[0].message});
  }

  try {
    if (!req.user._moderator)
      return res.status(403).send('you are not the moderator');

    let subject = await Subject.findOne({
      subject_code: req.body.subject_code.toUpperCase(),
    });

    if (subject) return res.status(400).send('Subject already existed.');

    subject = new Subject({
      name: req.body.name,
      subject_code: req.body.subject_code.toUpperCase(),
      description: req.body.description,
      created_by: [req.user._id],
    });

    let subject_creator = await User.findOne({_id: req.user._id});
    if (!subject_creator.moderated_subjects)
      subject_creator.moderated_subjects = [];

    subject_creator.moderated_subjects.push(subject._id);

    await subject_creator.save();
    await subject.save();

    const students = await User.find().and(
      {is_moderator: false},
      {is_admin: false}
    );

    if (students.length > 0) {
      // add the new added subject to the existed students
      await updateStudentSubjects(subject, students);
    }

    return res.status(200).send(subject);
  } catch (e) {
    console.error(e.message);
    res.status(400).send('something wrong');
  }
});

// moderator delete a subject
router.delete('/delete', auth, subjectController.deleteSubject);

// user get all subjects
router.get('/all', auth, async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (ex) {
    console.error(ex.message);
  }
});
// user searches a subject
router.get('/search', subjectController.searchSubject);

// usear gets a subject
router.get('/:subject_code', auth, subjectController.getSubjectbyCode);

// user gets a subject
router.get('/', subjectController.getSubjectById);

// moderator updates a subject
router.patch('/patch', auth, subjectController.updateSubject);

module.exports = router;
