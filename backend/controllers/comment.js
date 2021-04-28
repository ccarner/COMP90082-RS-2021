const Comment = require('../proxies/comment')

exports.NewAndSave = (req, res) => {
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
        if(err){
            res.json({ success: false, error: 'failed to find the comment' })
        } else{
            if(result === null){
                return res.json({ success: false, error: 'failed to find the comment' })
            }
            const compareResult = String(req.user._id).localeCompare(String(result.author_id))
            if(compareResult===0 || req.user.is_moderator){
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
        if(err){
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