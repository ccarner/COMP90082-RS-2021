const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');
const verify = require('../middlewares/verifyToken');


/**
 *  description: publish an article
 */
router.post('/publish',verify.verify,ArticleController.publishTheArticle);



/**
 *  description: create a new article
 */
router.get('/create',verify.verify, ArticleController.CreateAnArticle);


/**
 *  description: get a article
 */
router.get('/get/:id', verify.verify,ArticleController.getTheArticle);

/**
 *  description: delete a article
 */
router.get('/delete/:id', verify.verify,ArticleController.deleteTheArticle);

/**
 *  description: edit a article
 */
router.get('/edit/:id', verify.verify,ArticleController.editTheArticle);

/**
 *  description: edit a pending
 */
router.get('/editPendingArticle/:id', verify.verify,ArticleController.editThePendingArticle);

/**
 *  description:get all name of article
 */
router.get('/getNamesOfArticles/:subject_code_Or_Tool_name', verify.verify, ArticleController.getAllNamesOfTheArticles);

router.get('/pendingArticle/reject/:pending_id', verify.verify, ArticleController.rejectPendingArticle);

router.get('/pendingArticle/approve/:pending_id', verify.verify, ArticleController.approvePendingArticle);

router.get('/getPendingArticle/:id', verify.verify,ArticleController.getThePendingArticle);

router.get('/getNamesOfPendingArticles/:subject_code_Or_Tool_name', verify.verify, ArticleController.getNamesOfPendingArticles);

router.get('/getAllPendingArticlesByUserId', verify.verify, ArticleController.getPendingArticlesByUserId);

router.get('/getAllPublishedArticlesByUserId', verify.verify, ArticleController.getPublishedArticlesByUserId);

module.exports = router;