var User     = require('../proxies').User;
var Subject  = require('../proxies').Subject;
var Tool     = require('../proxies').Tool;
var Article  = require('../proxies').Aritcle;
var Comment  = require('../proxies').Comment;

// http:localhost:4000/user/add
exports.addUser = function (req, res, next) {
    if(!req.user._moderator){
        return res.json({success: false, error : 'You are not a moderator'})
    }
    var name = req.body.name;
    var account = req.body.account;
    var password = req.body.password;
    var student_number = req.body.student_number;
    var is_moderator = req.body.is_moderator;
  
    User.newAndSave(req.body, function (err, user) {
        if (err) {
            res.json({ success: false, error: 'failed to save user', error: err });
        } else {
            return res.json({ success: true, user: user });
        }
    });
};

// http:localhost:4000/subject/add
exports.addSubject = function (req, res, next) {
    var name = req.body.name;
    var subject_code = req.body.subject_code;
    var password = req.body.password
    var moderators = req.body.moderators;
    console.log("test")
    Subject.newAndSave(name, account, student_num, password, is_moderator, function (err, subject) {
        if (err) {
            console.log(err);
            res.json({ success: false, error: 'failed to save subject' });
        } else {
            return res.json({ success: true, subject: subject });
        }
    });
};

// http:localhost:4000/tool/add
exports.addTool = function (req, res, next) {
    var name = req.body.name;
    var moderators = req.body.moderators;
  
    Tool.newAndSave(name, moderators, function (err, tool) {
        if (err) {
            console.log(err);
            res.json({ success: false, error: 'failed to save tool' });
        } else {
            return res.json({ success: true, tool: tool });
        }
    });
};

// http:localhost:4000/article/add
exports.addArticle = function (req, res, next) {
    var title     = req.body.title;
    var author_id = req.body.author_id;
    var tags      = req.body.tags;
    var content   = req.body.content;
    var subjects  = req.body.subjects;
    var tools     = req.body.tools;
  
    Article.newAndSave(title, author_id, tags, content, subjects, tools, function (err, article) {
        if (err) {
            console.log(err);
            res.json({ success: false, error: 'failed to save article' });
        } else {
            return res.json({ success: true, article: article });
        }
    });
};

// http:localhost:4000/comment/add
exports.addComment = function (req, res, next) {
    var content     = req.body.content;
    var topic_id    = req.body.topic_id;
    var author_id   = req.body.author_id;
    var comment_id  = req.body.comment_id;
  
    Comment.newAndSave(content,topic_id, author_id, comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            res.json({ success: false, error: 'failed to save comment' });
        } else {
            return res.json({ success: true, comment: comment });
        }
    });
};
