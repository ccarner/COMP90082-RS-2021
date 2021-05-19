const {User} = require('../models/user');
const {Subject} = require('../models/subject');
const cache = require('../models/cache');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



/**
 * Generate a hashed password
 * @param {String} password       the password
 */
hashfunction = async function (password){
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(String(password), salt);
  return hashedPassword
}


/**
 * Add a new user to the database
 * Callback:
 * - err, error in database
 * - user, the user
 * @param {String} name           the name of the user
 * @param {String} account        the account of the user
 * @param {String} student_num    the student number of the user
 * @param {Boolean} is_moderator  whether the student is a moderator or not
 * @param {Function} callback     the callback function
 */
exports.newAndSave = async function (user, callback) {
    let newUser = new User(user);
    newUser.password = await hashfunction(user.password)
    newUser.save(callback);

  cache.set(newUser,newUser.password, (err, res) => {
    console.log('newUser info added in redis')
  });

  };

exports.newAndSave2 = async function (name, account, student_number, password, email, is_moderator, callback) {
  const hashedPassword = await hashfunction(password);
  const user = new User();

  user.account        = account;
  user.password       = hashedPassword;
  user.student_number = student_number;
  user.email          = email;
  if(is_moderator != undefined){
    user.is_moderator   = is_moderator;
  } else if (user.name != undefined){
    user.name           = name;
  }


  user.save(callback);

  cache.set(user.account,(user.password,user.student_number,user.is_moderator), (err, res) => {
    console.log('user info added in redis')
  });
};

 /**
 * Query a user based on the objectId
 * Callback:
 * - err, error in database
 * - user, the user
 * @param {String} id         the objectId of the user
 * @param {Function} callback the callback function
 */
exports.getUserById = async function (id, callback) {
  if (!id) {
    return callback("Error", undefined);
  }
  const user = await User.findOne({_id:mongoose.Types.ObjectId(id)});

  callback(undefined, user)
};

exports.getUserHomePage = async function(id, callback){
  if (!id) {
    return callback("Error", undefined);
  }
  const user = await User.findOne({_id:mongoose.Types.ObjectId(id)}).populate(
    'moderated_subjects').populate('subscribed_subjects').populate('subscribed_tools').exec();

  callback(undefined, user)
}

exports.getUserById2 = async function (id, callback) {
    if (!id) {
        return callback();
    }
    await User.findOne({_id:mongoose.Types.ObjectId(id)}, callback);
};
/**
 * Query a user based on the objectId
 * Callback:
 * - err, error in database
 * - user, the user
 * @param {String} account         the account of the user
 * @param {Function} callback the callback function
 */
exports.getUserByAccount = async function (userAccount, callback) {
  const users = await User.find({account: userAccount})
  user = users[0]
  if(user == null){
    return callback();
  }
  User.findOne({_id:mongoose.Types.ObjectId(user.id)}, callback);
};



 /**
 * Query all users in the database
 * Callback:
 * - err, error in database
 * - users, the users
 */
exports.getAllUsers = function (callback) {
  User.find(callback);
};



exports.updateImage = function (id,data,callback) {
    User.update(
          { "_id": id},
          { "$push": data },
          function (err, raw) {
              // if (err) 
              // console.log('The raw response from Mongo was ', raw);
              // res.json(`error:${raw}`);
          }
       );
};

exports.updateModeratedSubject = async function(subject, userId) {
  console.log("subjectId: "+subject._id)
  console.log("userId: "+userId)

  let user = await User.findOne({_id:mongoose.Types.ObjectId(userId)});
  console.log("moderated_subjects: "+user.moderated_subjects)
  if(user.moderated_subjects === undefined){
    user.moderated_subjects = []
  }
  user.moderated_subjects.push(subject._id)
  user.save()
  return subject
}

exports.updateSubscribedSubject = function (subject_id, subscriber_id, callback) {
  Subject.findById(subject_id, function (err, subject) {
    console.log(subject)
    if (err || !subject) {
      return callback("Error", undefined);
    }

    User.findById(subscriber_id, function (err, user) {
      if (err || !user) {
        return callback("Error", undefined);
      }
      if(user.subscribed_subjects	 === undefined){
        user.subscribed_subjects = []
      }
      if(!user.subscribed_subjects.includes(subject._id)){
        user.subscribed_subjects.push(subject._id)
      }
      
      user.save(callback)
    });
  });
  
};
