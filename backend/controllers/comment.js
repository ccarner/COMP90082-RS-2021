const Comment = require('../proxies/comment')
//
const Joi = require('joi');

exports.NewAndSave = (req, res) => {
    let comment = req.body
    const compareResult = String(req.user.id).localeCompare(String(comment.author_id))

    

    if(!compareResult){
        return res.json({ success: false, error: 'Unauthorized comment saving' })
    }
    Comment.newAndSave(comment, (err, result) => {
        const schema = {
            reply_to_username: Joi.string().min(3).max(25).required(),
            title: Joi.string().min(3).max(25).required(),
            content: Joi.string().min(25).required(),
            tags: Joi.string().min(3).max(25)
        };

        const validateResult = Joi.validate(req.body, schema);
        if(validateResult.error){
            return res.json({ success: false, error_info: error.details[0].message });
        }

        if(err){
            console.log(err)
            res.json({ success: false, error: 'failed to save the comment' })
        } else {
            res.json({ success: true, comment: result })
        }
    })
}

exports.deleteComment = (req, res) => {
    Comment.getCommentById(req.body._id, (err, result) => {
        if(err||!result){
            res.json({ success: false, error: 'failed to find the comment' })
        } else{
            const compareResult = String(req.user._id).localeCompare(String(result.author_id))
            if(!compareResult || req.user.is_moderator){
                Comment.deleteComment(req.body._id, (err, result) => {
                    if(err){
                        res.json({ success: false, error: 'failed to delete the comment' })
                    } else {
                        res.json({ success: true, comment: result })
                    }
                })
            } else {
                res.json({ success: false, error: 'unauthorized action' })
            }
        }
    })
}

exports.getCommentById = (req, res) => {
    Comment.getCommentById(req.body._id, (err, result) => {
        if(err){
            res.json({ success: false, error: 'Failed to get the comment' })
        } else {
            res.json({ success: true, comment: result })
        }
    })
}

exports.getAllCommentsUnderThisSection = (req, res) => {
    Comment.getAllCommentsUnderThisSection(req.body.section_id, (err, result) => {
        if(err) {
            res.json({ success: false, error: 'Failed to get comments under this section' })
        } else {
            res.json({ success: true, comments: result })
        }
    })
}

exports.getAllCommentsOfUser = (req, res) => {
    Comment.getAllCommentsOfUser(req.user._id, (err, result) => {
        if(err) {
            res.json({ success: false, error: 'Failed to get comments ' })
        } else {
            res.json({ success: true, comments: result })
        }
    })
}

exports.updateComment = (req, res) => {
    Comment.getCommentById(req.body._id, (err, result) => {
        if(err||!result){
            res.json({ success: false, error: 'failed to find the comment' })
        } else {
            const compareResult = String(req.user._id).localeCompare(String(result.author_id))
            if(!compareResult){
                Comment.updateComment(req.body, (err, result) => {
                    if(err){
                        res.json({ success: false, error: 'Failed to update this comment'+err })
                    } else {
                        res.json({ success: true, comment: result })
                    }
                })
            } else {
                res.json({ success: false, error: 'unauthorized action' })
            }
        }
    })


    
}