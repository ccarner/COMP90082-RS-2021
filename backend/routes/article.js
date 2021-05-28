const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Article, PendingArticle} = require('../models/article');

const {User} = require('../models/user');
const ArticleController = require('../controllers/article');
const auth = require('../middlewares/auth');
const verify = require('../middlewares/verifyToken');
const _ = require('lodash');
const Joi = require('joi');

if (process.env.NODE_ENV !== 'production') {
  console.warn('you are using development mode code');
  router.post('/publish', auth, async (req, res) => {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().min(5).required(),
      subjects: Joi.array().items(Joi.string()),
      tags: Joi.array().items(Joi.string()),
      tools: Joi.array().items(Joi.string()),
    });
    const {error} = schema.validate(req.body);
    if (error) {
      return res.json({success: false, error_info: error.details[0].message});
    }

    req.body.editor_id = req.user._id; // editor_id for pending article
    req.body.is_pending = false;

    if (req.user._moderator) {
      if (req.body.article_id) {
        try {
          await Article.findByIdAndUpdate(req.body.article_id, req.body);
          console.log('new article submitted');

          await PendingArticle.deleteOne({
            published_article: req.body.article_id,
          });

          return res.status(200).json({
            success: true,
            article_id: req.body.article_id,
            auth_token: req.header('auth-token'),
          });
        } catch (err) {
          console.log('error1');
          return res.status(400).json({
            success: false,
            error_info: err,
            auth_token: req.header('auth-token'),
          });
        }
      } else {
        try {
          const author = await User.findOne({_id: req.user._id});
          const article = new Article({
            title: req.body.title,
            author_id: mongoose.Types.ObjectId(req.user._id),
            tags: req.body.tags,
            content: req.body.content,
            subjects: req.body.subjects,
            tools: req.body.tools,
            likes: [],
            is_pending: false,
          });
          await article.save();

          author.articles = [...author.articles, article._id];
          await author.save();

          return res.status(200).json({
            success: true,
            article_id: article._id,
            auth_token: req.header('auth-token'),
          });
        } catch (err) {
          return res.status(400).json({
            success: false,
            error_info: err,
            auth_token: req.header('auth-token'),
          });
        }
      }
    } else {
      if (req.body.article_id) {
        try {
          await Article.findByIdAndUpdate(req.body.article_id, {
            is_pending: true,
          });

          return res
            .status(200)
            .json({success: false, auth_token: req.header('auth-token')});
        } catch (error) {
          return res.status(400).json({
            success: false,
            error_info: error,
            auth_token: req.header('auth-token'),
          });
        }
      } else {
        try {
          const newPendingArticle = new PendingArticle({
            title: req.body.title,
            editor_id: req.body.editor_id,
            tags: req.body.tags,
            content: req.body.content,
            subjects: req.body.subjects,
            likes: [],
            tools: req.body.tools,
            article_id: req.body.article_id
              ? mongoose.Types.ObjectId(req.body.article_id)
              : null,
          });

          await newPendingArticle.save();

          return res.status(200).json({
            success: true,
            article_id: newPendingArticle._id,
            auth_token: req.header('auth-token'),
          });
        } catch (err) {
          return res.status(400).json({
            success: false,
            error_info: err,
            auth_token: req.header('auth-token'),
          });
        }
      }
    }
  });
} else {
  /**
   *  description: publish an article
   */
  router.post('/publish', auth, ArticleController.publishTheArticle);
}

/**
 *  description: create a new article
 */
router.get('/create', auth, ArticleController.CreateAnArticle);

/**
 *  description: get a article
 */

if (process.env.NODE_ENV !== 'production') {
  router.get('/get/:id', auth, async (req, res) => {
    let article = await Article.findById(req.params.id)
      .populate({
        path: 'comment_section',
        populate: {path: 'comments', populate: {path: 'leaf_comments'}},
      })
      .exec();

    article.like_number = article.likes.length;
    article.is_like = article.likes.includes(req.user._id);

    return res.status(200).send({
      success: true,
      returnValuesForArticle: article,
      auth_token: req.header('auth-token'),
    });
  });
} else {
  router.get('/get/:id', verify.verify, ArticleController.getTheArticle);
}
/**
 *  description: delete a article
 */
router.get('/delete/:id', auth, ArticleController.deleteTheArticle);

/**
 *  description: edit a article
 */
router.get('/edit/:id', auth, ArticleController.editTheArticle);

if (process.env.NODE_ENV !== 'production') {
  router.get('/editPendingArticle/:id', auth, async (req, res) => {
    console.log(req.params.id);
    try {
      const pendingArticle = await PendingArticle.findOne({_id: req.params.id});
      if (
        pendingArticle.editor_id &&
        pendingArticle.editor_id.toString() === req.user._id.toString()
      ) {
        const returnValuesForArticle = {
          title: pendingArticle.title,
          content: pendingArticle.content,
          id: req.params.id,
        };
        return res.status(200).json({
          success: true,
          returnValuesForArticle,
          auth_token: req.header('auth-token'),
        });
      } else {
        return res.status(401).json({
          success: false,
          error_info: 'only the creator of this article can edit',
          auth_token: req.header('auth-token'),
        });
      }
    } catch (error) {
      return res.status(400).send('something wrong...');
    }
  });
} else {
  /**
   *  description: edit a pending
   */
  router.get(
    '/editPendingArticle/:id',
    auth,
    ArticleController.editThePendingArticle
  );
}

/**
 *  description:get all name of article
 */
router.get(
  '/getNamesOfArticles/:subject_code_Or_Tool_name',
  auth,
  ArticleController.getAllNamesOfTheArticles
);

router.get(
  '/pendingArticle/reject/:pending_id',
  auth,
  ArticleController.rejectPendingArticle
);

router.get(
  '/pendingArticle/approve/:pending_id',
  auth,
  ArticleController.approvePendingArticle
);

router.get(
  '/getPendingArticle/:id',
  auth,
  ArticleController.getThePendingArticle
);

router.get(
  '/getNamesOfPendingArticles/:subject_code_Or_Tool_name',
  auth,
  ArticleController.getNamesOfPendingArticles
);

router.get(
  '/getAllPendingArticlesByUserId',
  auth,
  ArticleController.getPendingArticlesByUserId
);

if (process.env.NODE_ENV !== 'production') {
  router.get('/getAllPublishedArticlesByUserId', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send('invalid user!');

    const articles = await Article.find({author_id: req.user._id});

    if (!articles)
      return res.status(400).json({
        success: false,
        error_info: 'cannot get all published articles for this user',
        auth_token: req.header('auth-token'),
      });

    const articleInfo = _.map(articles, (article) =>
      _.pick(article, ['title', 'id'])
    ).map(function (article) {
      return {name: article.title, id: article.id};
    });

    return res.status(200).json({
      success: true,
      articles: articleInfo,
      auth_token: req.header('auth-token'),
    });
  });
} else {
  router.get(
    '/getAllPublishedArticlesByUserId',
    auth,
    ArticleController.getPublishedArticlesByUserId
  );
}
router.get('/like/:id', auth, ArticleController.likeArticle);
router.get('/unlike/:id', auth, ArticleController.unlikeArticle);

router.patch('/liked', async (req, res) => {
  const article = await Article.findById(req.body.article_id);
  const reader = await User.findById(req.body.reader_id);
  const idx = article.likes.indexOf(reader._id);

  if (idx > -1)
    // should be done by frontend
    return res.status(404).send('user already existed');

  const updatedArticle = await Article.findByIdAndUpdate(
    req.body.article_id,
    {
      likes: [...article.likes, reader._id],
    },
    {new: true}
  );

  res.status(200).send(updatedArticle);
});

router.patch('/unliked', async (req, res) => {
  const article = await Article.findById(req.body.article_id);
  const reader = await User.findById(req.body.reader_id);
  const idx = article.likes.indexOf(reader._id);
  article.likes.splice(idx, 1);

  if (idx == -1)
    // should be done by frontend
    return res.status(404).send('user never click like');

  const updatedArticle = await Article.findByIdAndUpdate(
    req.body.article_id,
    {
      likes: article.likes,
    },
    {new: true}
  );

  res.status(200).send(updatedArticle);
});

module.exports = router;
