const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject')
const verify = require('../middlewares/verifyToken');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');
const {Subject} = require('../models/subject');
const {User} = require('../models/user');

// moderator creates a subject
if(process.env.NODE_ENV !== 'production'){
    router.post('/add', auth, async (req, res) =>{

        try{

            if(!req.user._moderator)
                return res.status(403).send('you are not the moderator');

            let subject = await Subject.findOne({ subject_code: req.body.subject_code.toUpperCase() });

            if(subject)
                return res.status(400).send("Subject already existed.");

            subject = new Subject({
                name : req.body.name,
                subject_code : req.body.subject_code.toUpperCase(),
                description : req.body.description,
                created_by : [req.user._id]
            });

            let subject_creator = await User.findOne({_id: req.user._id});
            if(!subject_creator.moderated_subjects)
                subject_creator.moderated_subjects = [];

            subject_creator.moderated_subjects.push(subject._id);

            await subject_creator.save();
            await subject.save();

            return res.status(200).send(subject);
        }catch (e) {
            console.error(e.message);
            res.status(400).send('something wrong');
        }
    });
}else{
    router.post('/add', auth, subjectController.addSubject)
}



// moderator delete a subject
router.delete('/delete', auth, subjectController.deleteSubject)

// user get all subjects
router.get('/all', auth, async (req, res) => {

    // if(!req.user._moderator)
    //     res.json({ success: false, error: 'error this account is not a moderator' });
    
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (ex) {
        console.error(ex.message);
    }

});
// user searches a subject
router.get('/search', subjectController.searchSubject)

// usear gets a subject
router.get('/:subject_code', auth, subjectController.getSubjectbyCode)

// user gets a subject
router.get('/', subjectController.getSubjectById)

// moderator updates a subject
router.patch('/patch', auth, subjectController.updateSubject)

module.exports = router;