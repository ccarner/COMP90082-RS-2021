const {Comment} = require('../models/comment');
const mongoose = require('mongoose');

/**
//  * Generate a comment record and save to database
//  * callback
//  * @param {String} topic_id      the _id of object commented by the comment
//  * @param {String} author_id     the _id of the author 
//  * @param {String} content      the content of the comment
//  * @param {String} comment_id    the _id of the parent comment (can be null)
//  * @param {Function} callback   the callback function
//  */
// exports.newAndSave = function (content, topic_id, author_id, comment_id, callback) {
//     // if no commentId, callback will be put into commentId
//     if (typeof comment_id === 'function') {
//       callback = comment_id;
//       comment_id  = null;
//     }

//     var comment       = new Comment();
//     comment.content   = content;
//     comment.topic_id  = mongoose.Types.ObjectId(topic_id);
//     comment.author_id = mongoose.Types.ObjectId(author_id);
  
//     if (comment_id) {
//       comment.comment_id = mongoose.Types.ObjectId(comment_id);
//     }
//     comment.save(callback);
//   };


exports.newAndSave = async (comment, callback) => {
  let reply_to_comment = {}
  if(comment.reply_to_id || comment.reply_to_id !== undefined){
    reply_to_comment = await Comment.findById(comment.reply_to_id)
    comment.reply_to_username = reply_to_comment.author_name
    comment.reply_to_id = reply_to_comment.author_id
    comment.root_comment_id = reply_to_comment.root_comment_id
    
  }
  const newComment = new Comment(comment);
  await newComment.save(callback)
  if(comment.reply_to_id || comment.reply_to_id !== undefined){
    root_comment = await Comment.findById(reply_to_comment.root_comment_id)
    root_comment.leaf_comments.push(newComment._id)
    await root_comment.save()
  }

};
  

/**
 * delete a comment by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} comment_id the ID of a tool
 * @param {function} callback  the call back function
 */
exports.deleteComment = async (comment_id, callback) => {
  try{
      const comment = await Comment.findById(comment_id)
      const root_comment_id = comment.root_comment_id
      await comment.remove()
      if(comment.reply_to_id === undefined || !comment.reply_to_id ){
        await Comment.deleteMany({root_comment_id: root_comment_id})
        
      }
      callback(undefined, "Successfully delete the comment")
  } catch (e){
      callback(e, undefined)
  }

}


exports.getCommentById = async (comment_id, callback) => {
  Comment.findById(comment_id, function(err, result){
    if(err||!result) {
        callback(err, result)
    } else {
        callback(undefined, result)
    }
})
}

exports.getAllCommentsUnderThisSection = async (section_id, callback) => {
  await Comment.find({'section_id': section_id}, callback)
}

exports.getAllCommentsOfUser = async (author_id, callback) => {
  await Comment.find({'author_id': author_id}, callback)
}


exports.updateComment = async (commentBody, callback) => {
  try{
    let comment = await Comment.findOne({ _id: commentBody._id})
    if (!comment){
      
      return callback("Invalid Update: Unable to find the comment", undefined)
    }
    comment['content'] = commentBody['content']
    await comment.save()
    return callback(undefined, comment)
  } catch (e){
    return callback("Invalid Update"+e, undefined)
  }
}

exports.likeComment = async (comment_id,user_id, callback) => {
  try{
    let comment = await Comment.findOne({ _id: comment_id})
    if (!comment||!user_id){
      
      return callback("Unable to find the comment or user", undefined)
    }
  
    comment.likes.addToSet(user_id)
    await comment.save()
    return callback(undefined, comment)
  } catch (e){
    return callback("Invalid Update"+e, undefined)
  }
}

exports.unlikeComment = async (comment_id,user_id, callback) => {
  try{
    let comment = await Comment.findOne({ _id: comment_id})
    if (!comment||!user_id){
      
      return callback("Unable to find the comment or user", undefined)
    }
    comment.likes.pull(user_id)
    await comment.save()
    return callback(undefined, comment)
  } catch (e){
    return callback("Invalid Update"+e, undefined)
  }
}
