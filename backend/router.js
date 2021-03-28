var express = require('express');

var test = require('./controllers/test');

var router = express.Router();

// test adding an user 
router.post('/user/add', test.addUser);

// test adding a subject 
router.post('/subject/add', test.addSubject);

// test add a tool
router.post('/tool/add', test.addTool);

// test adding an article
router.post('/article/add', test.addArticle);

// test adding an comment
router.post('/comment/add', test.addComment);




module.exports = router;
