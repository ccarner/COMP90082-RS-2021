const UserProxy = require('../proxies/user');
const {Subject} = require('../models/subject');
const {User} = require('../models/user');
const Tool = require('../proxies/tool');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'THIS_IS_SECRET'
const Joi = require('joi');
const aws = require('aws-sdk');
const fs = require('fs');

const _ = require('lodash');

/**
 * post upload image single 
 * @param req
 * @param res
 
 */

exports.upload = function (req, res) {
  const spacesEndpoint = new aws.Endpoint('https://nyc3.digitaloceanspaces.com');
  const authtoken = req.header('auth-token');
  let mtoken = jwt.decode(authtoken);

  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,

  });

  const s3 = new aws.S3({
    endpoint: spacesEndpoint
  });
  let params = {
    ACL: 'public-read',
    Bucket: "soft-repo-team",
    Body: fs.createReadStream(req.file.path),
    Key: `${mtoken._id}/${req.file.originalname}`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {

      fs.unlinkSync(req.file.path); // Empty temp folder
      const locationUrl = data.Location;

      console.log(locationUrl);

      UserProxy.updateImage(
        mtoken._id,
        {images: locationUrl},
        function (err, raw) {
          if (err) console.log('The raw response from Mongo was ', raw);
          res.json(`success: false , error:${raw}`);
        }
      );

      responsejson = {
        success: true,
        imageurl: locationUrl
      };
      res.json(responsejson);
    }
  });
}

/**
* get all uploaded images of current user
* @param req
* @param res
 
*/
exports.getAllImages = function (req, res) {
  UserProxy.getUserById(req.user._id, function (err, user) {
    var responsejson = {
      success: true,
      images: user.images
    };
    res.json(responsejson);
  })

}
/**
 * get subscribed tools and subjects
 * @param req
 * @param res
 * @param next
 */

exports.getUserHomePage = async function (req, res) {
  UserProxy.getUserHomePage(req.user._id, (err, result) => {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, user: result });
    }
  })
}

exports.getAllUsers = function (req, res) {
  UserProxy.getAllUsers(function (err, users) {
    if (err) {
      res.json({ success: false, error: 'failed to get all users' });
    } else {
      let userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });
      res.send(userMap);
    }
  })

}

exports.subscribe_subject = function (req, res) {
  let subjectid = req.body.subject_id;
  UserProxy.updateSubscribedSubject(
    subjectid,
    req.user._id,
    (error, result) => {
      if (error) {
        res.json({
          success: false,
          error: 'failed to subscribe the subject' + error,
        });
      } else {
        res.json({success: true, user: result});
      }
    }
  );
};

exports.addUser = async function (req, res) {
  // if(!req.user._admin){
  //     return res.json({success: false, error : 'You are not an Admin'})
  // }

  const users = await User.find().or([
    {account: req.body.account},
    {student_number: req.body.student_number},
  ]);

  if (users.length !== 0)
    return res.status(400).send('Duplicate username or student id');

  const user = new User({
    name: req.body.name,
    account: req.body.account,
    password: await hashfunction(req.body.password),
    student_number: req.body.student_number,
    is_moderator: req.body.is_moderator,
    is_admin: false,
    subscribed_subjects: req.body.is_moderator
      ? []
      : _.map(await Subject.find(), '_id'),
    email: req.body.email,
  });

  await user.save();

  return res.status(200).json({success: true, user: user});
};

exports.studentRegister = async function (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    const schema = Joi.object().keys({
      name: Joi.string(),
      studentId: Joi.string().min(6).max(7).required(),
      username: Joi.string().min(5).max(15).required(),
      password: Joi.string().min(5).max(15).required(),
      email: Joi.string().email().trim()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({success: false, error_info: error.details[0].message});
    }

    const users = await User.find().or([
      {account: req.body.username},
      {student_number: req.body.studentId},
    ]);

    if (users.length !== 0)
      return res.status(400).send('Duplicate username or student id');

    const user = new User({
      name: req.body.name,
      account: req.body.username,
      password: await hashfunction(req.body.password),
      student_number: req.body.studentId,
      is_moderator: false,
      is_admin: false,
      subscribed_subjects: _.map(await Subject.find(), '_id'),
      email: req.body.email,
    });

    await user.save();

    return res.status(200).json({success: true, user: user});
  }
};