const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Article} = require('../models/article')

const ArticleController = require('../controllers/article');
const auth = require('../middlewares/auth');
const verify = require('../middlewares/verifyToken');


if(process.env.NODE_ENV === "development"){
    router.post('/publish',auth, async (req,res)=>{
        console.log('the user id is in publish the article',req.user._id);
        // First create pending article
        let data = req.body;
        req.body.editor_id = req.user._id; // editor_id for pending article
        req.body.is_pending= false;

        const article = new Article({
            title     : req.body.title,
            author_id : mongoose.Types.ObjectId(req.body.author_id),
            tags      : req.body.tags,
            content   : req.body.content,
            subjects  : req.body.subjects,
            tools     : req.body.tools,
            is_pending : false
        });
        await article.save();
        res.status(200).send({ success: true, article_id: article._id, auth_token: req.header('auth-token')});

    });
}else{
    /**
     *  description: publish an article
     */
    router.post('/publish',auth, ArticleController.publishTheArticle);
}




/**
 *  description: create a new article
 */
router.get('/create',auth, ArticleController.CreateAnArticle);


/**
 *  description: get a article
 */
router.get('/get/:id', auth,ArticleController.getTheArticle);

/**
 *  description: delete a article
 */
router.get('/delete/:id', auth,ArticleController.deleteTheArticle);

/**
 *  description: edit a article
 */
router.get('/edit/:id', auth,ArticleController.editTheArticle);

/**
 *  description: edit a pending
 */
router.get('/editPendingArticle/:id', auth,ArticleController.editThePendingArticle);

/**
 *  description:get all name of article
 */
router.get('/getNamesOfArticles/:subject_code_Or_Tool_name', auth, ArticleController.getAllNamesOfTheArticles);

router.get('/pendingArticle/reject/:pending_id', auth, ArticleController.rejectPendingArticle);

router.get('/pendingArticle/approve/:pending_id', auth, ArticleController.approvePendingArticle);

router.get('/getPendingArticle/:id', auth,ArticleController.getThePendingArticle);

router.get('/getNamesOfPendingArticles/:subject_code_Or_Tool_name', auth, ArticleController.getNamesOfPendingArticles);

router.get('/getAllPendingArticlesByUserId', auth, ArticleController.getPendingArticlesByUserId);

router.get('/getAllPublishedArticlesByUserId', auth, ArticleController.getPublishedArticlesByUserId);

module.exports = router;