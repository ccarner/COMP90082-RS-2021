var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var Section = require('./section')
var User = require('./user')

var CommentSchema = new Schema({
    author_id : {type: Schema.Types.ObjectId, required: true}, // the _id of the author of this comment
    author_name: {type: String},
    user_avatat: {type: String},
    section_id: {type: Schema.Types.ObjectId, required: true}, // the _id of the articles, tools or subjects where this comment belongs to
    reply_to_id: {type: Schema.Types.ObjectId}, // the _id of the comment that this comment replies to
    reply_to_username: {type: String}, // the username of the comment that this comment replies to
    root_comment_id: {type: Schema.Types.ObjectId}, // the _id of the root of the comment tree
    leaf_comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    content: {type: String, required: true}, 
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },

    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
  });

CommentSchema.pre('save', async function(next){
  this.update_at = Date.now()
  try{
    const current_user = await User.findById(this.author_id)
    this.author_name = current_user.name || 'testName'
    this.user_avatat = current_user.avatar || 'testAvatar'
    
  } catch(err){
    console.log(err)
  }
  if(this.reply_to_id === undefined || !this.reply_to_id){
    this.root_comment_id = this._id
  }
  next()
})

CommentSchema.post('save', async function(){
  if(this.reply_to_id === undefined || !this.reply_to_id){
    let section = await Section.findById(this.section_id)

    if (!section.comments.includes(this._id)){
      section.comments.push(this._id)
      await section.save()
    }
  }
})

CommentSchema.pre('remove', async function (next) {
  console.log(this)
  let section = await Section.findById(this.section_id)
  
  comments = section.comments.filter(x => String(x).localeCompare(String(this._id)))
  section.comments = comments
  await section.save()
  next()
})


const Comment = new mongoose.model('Comment', CommentSchema);
exports.Comment = Comment;