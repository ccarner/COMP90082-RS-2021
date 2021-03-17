const Subject = require('../proxies/subject')
const User = require('../proxies/user')

exports.addSubject = (req,res) => {
    console.log("this is moderator", req.user._moderator)
    
    if(!req.user._moderator){
        res.json({ success: false, error: 'error this account is not a moderator' })
        
    }else{
        creator_id = [req.user._id]
        Subject.newAndSave(req.body.name, req.body.subject_code, req.body.description,
            creator_id, (err, subject) => {
                if(err){
                    console.log(err)
                    res.json({ success: false, error: 'failed to save subject' })
                } else {
                    User.updateModeratedSubject(subject, subject.created_by, (error, result) => {
                        if(error){
                            res.json({ success: false, error: 'failed to save section into the subject' + error })
                        }
                    })
                    return res.json({ success: true, subject: subject })
                }
            })
    }
}

exports.searchSubject = (req,res) => {
    Subject.getSubjectByName(req.body.name, (err, result) => {
        if(err){
            res.json({ success: false, error: 'failed to find the subject' })
        } else{
            if(!result.length){
                Subject.getSubjectbyCode(req.body.name, (err,result) => {
                    if(err){
                        res.json({ success: false, error: 'failed to find the subject' })
                    } else{
                        res.json({success: true, subjects: result})
                    }
                })
            } else {
                res.json({success: true, subjects: result})
            }
        }
    })
}

exports.deleteSubject = (req,res) => {
    let subject_id = req.body._id
    if(!req.user._moderator){
        res.json({ success: false, error: 'error this account is not a moderator' })
    } else {
        Subject.deleteSubject(subject_id, (err, result) => {
            if(err || result.n === 0){
                res.json({ success: false, error: 'failed to delete subject' })
            } else {
                return res.json({ success: true})
            }
        })
    }
}

exports.getAllSubjects = (req, res) => {
    if(!req.user._moderator){
        res.json({ success: false, error: 'error this account is not a moderator' })
    } else {
        Subject.getAllSubjects((err, subjects) => {
            if(err){
                console.log(err)
                res.json({ success: false, error: 'failed to retrieve subjects' })
            } else{
                res.json(subjects)
            }

        })
    }
}

exports.getSubjectbyCode = (req,res) => {
    let subject_code = req.params.subject_code || req.body.subject_code
    
    Subject.getSubjectbyCode(subject_code, (err, result) => {
        if(err){
            console.log(err)
            res.json({ success: false, error: 'failed to find the subject' })
        } else{
            let is_subscribed = false
            User.getUserById2(req.user._id, (err, userResult) => {
                if(err){
                    res.json({ success: false, error: 'failed to get the subject' })
                }
                console.log("result: "+ userResult)
                console.log("result subject id: "+ result._id)
                if(userResult.subscribed_subjects.includes(result._id)){
                    is_subscribed = true
                    res.json({success: true, subject: result, is_subscribed: is_subscribed})
                }
                else{
                    res.json({success: true, subject: result, is_subscribed: is_subscribed})
                }
            })
        }
    })
}

exports.getSubjectById = (req,res) => {
    Subject.getSubjectById(req.body._id, (err, result) => {
        if(err){
            console.log(err)
            res.json({ success: false, error: 'Failed to get the subject' })
        } else {
            res.json({ success: true, subject: result })
        }
    })
}

exports.updateSubject = (req, res) => {
    if(!req.user._moderator){
        res.json({ success: false, error: 'error this account is not a moderator' })
    } else {
        Subject.updateSubject(req.body, (err, result) => {
            if(err){
                console.log(err)
                res.json({ success: false, error: 'Failed to update a subject' })
            } else {
                res.json({ success: true, subject: result })
            }
        })
    }
}