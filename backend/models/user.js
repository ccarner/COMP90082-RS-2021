const mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
const config = require('config');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: { type: String},
    account: { type: String, unique: true, required: true},
    password: {type: String, required: true},
    student_number: { type: String,trim: true, index: true, unique: true, sparse: true},
    is_moderator: { type: Boolean, default: false},
    is_admin: {type: Boolean, default: false},
    avatar: {type: String},
    subscribed_tools: [{type: Schema.Types.ObjectId, ref: 'Tool'}],
    subscribed_subjects: [{type: Schema.Types.ObjectId, ref: 'Subject'}],
    moderated_subjects: [{type: Schema.Types.ObjectId, ref: 'Subject'}],
    articles: [{type: Schema.Types.ObjectId, ref: 'Article'}],
    images: [{
      type: String
  }]
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: user.id, _moderator: user.is_moderator, _admin: isAdmin}, config.get("jwtPrivateKey"));

  return token;
};

const User = new mongoose.model('User',UserSchema);
exports.User = User;