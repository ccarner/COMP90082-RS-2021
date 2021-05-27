const Comment = require('../proxies/comment');
const Joi = require('joi');

exports.NewAndSave = (req, res) => {
    const schema = Joi.object().keys({
        author_id: Joi.required(),
        section_id: Joi.required(),
        content: Joi.string().max(255).required()
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.json({ success: false, error_info: error.details[0].message });
      }
    let comment = req.body
    const compareResult = String(req.user.id).localeCompare(String(comment.author_id))
    if(!compareResult){
        return res.json({ success: false, error: 'Unauthorized comment saving' })
    }
    Comment.newAndSave(comment, (err, result) => {
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

exports.likeCommentById = (req, res) => {
    Comment.getCommentById(req.params.id, (err, result) => {
        if(err||!result||undefined) {
            res.json({ success: false, error: err })
        } else {
            Comment.likeComment(req.params.id,req.user._id,(err,result)=>{
                if(err){
                    res.status(400).json({ success: false, error: 'Failed to like this comment since '+err })
                }else{
                    res.status(200).json({ success: true, comments: result })
                }
            })

            
        }
    })
}

exports.unlikeCommentById = (req, res) => {
    Comment.getCommentById(req.params.id, (err, result) => {
        if(err||!result||undefined) {
            res.json({ success: false, error: err })
        } else {
            Comment.unlikeComment(req.params.id,req.user._id,(err,result)=>{
                if(err){
                    res.status(400).json({ success: false, error: 'Failed to unlike this comment since '+err })
                }else{
                    res.status(200).json({ success: true, comments: result })
                }
            })

            
        }
    })
}
