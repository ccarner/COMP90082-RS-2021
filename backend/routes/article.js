const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');
const auth = require('../middlewares/auth');
const verify = require('../middlewares/verifyToken');


/**
 *  description: publish an article
 */
router.post('/publish',auth,ArticleController.publishTheArticle);



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