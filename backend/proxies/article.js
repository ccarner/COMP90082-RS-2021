const {Article, PendingArticle} = require('../models/article');
const mongoose = require('mongoose');

/**
 *
 * @param data
 * @param callback
 */
exports.newAndSave = function (data,callback) {

    const article = new Article();
    article.title     = data.title;
    article.author_id = mongoose.Types.ObjectId(data.author_id);
    article.tags      = data.tags;
    article.content   = data.content;
    article.subjects  = data.subjects;
    article.tools     = data.tools;
    article.is_pending = false;

  
    article.save(callback);
  };

exports.newAndSave2 = function (is_pending, initial_article, callback) {

    const article = new Article();

    article.is_pending = is_pending;
    article.history_articles = [];
    article.rejected_articles = [];

    if(!is_pending) {
        article.current_article = mongoose.Types.ObjectId(initial_article._id);
        article.author_list = [mongoose.Types.ObjectId(initial_article.editor_id)];
        article.title = initial_article.title;
        article.content = initial_article.content;
        article.tags = initial_article.tags;
        article.tools = initial_article.tools;
        article.subjects = initial_article.subjects;
        article.pending_articles = [];
    }else{
        article.pending_articles = [mongoose.Types.ObjectId(initial_article._id)];
        article.author_list = [];
    }

    article.save(callback);
};

exports.newPendingArticle = function (data, callback) {
    const pending_article = new PendingArticle();
    pending_article.title = data.title;
    pending_article.editor_id = data.editor_id;
    pending_article.tags = data.tags;
    pending_article.content = data.content;
    pending_article.subjects = data.subjects;
    pending_article.tools = data.tools;
    if(data.article_id){
        pending_article.article_id = mongoose.Types.ObjectId(data.article_id);
    }

    pending_article.save(callback);
};


exports.updateArticle = function(id, info, callback){
    if (!id) {
        return callback();
    }
    info.author_id = mongoose.Types.ObjectId(info.author_id);
    Article.findByIdAndUpdate(id,info,callback)
};


exports.getArticleById = function (id, callback) {
    if (!id) {
        return callback();
    }
    Article.findOne({_id:mongoose.Types.ObjectId(id)}, callback).populate({path: 'comment_section', populate: {path: 'comments', populate: {path: 'leaf_comments'}}}).exec();
};


exports.deleteArticleById = function (id, callback) {
    if (!id) {
        return callback();
    }
    Article.deleteOne({_id:mongoose.Types.ObjectId(id)}, callback);
};

exports.deletePendingArticleByPublishedArticleId = function (id, callback) {
    if (!id) {
        return callback();
    }
    PendingArticle.deleteOne({published_article:id}, callback);
};

exports.deletePendingArticleById = function (id, callback) {
    if (!id) {
        return callback();
    }
    PendingArticle.deleteOne({_id:mongoose.Types.ObjectId(id)}, callback);
};
exports.getAllArticles = function (callback) {
    Article.find(callback);
}

exports.getAllPendingArticles = function (callback) {
    PendingArticle.find(callback);
}

exports.getPendingArticleById = function (id, callback) {
    if (!id) {
        return callback("Error: id undefined");
    }
    PendingArticle.findOne({_id:mongoose.Types.ObjectId(id)}, callback);
};

exports.editExistingArticle = function (article_id, pending_article, is_moderator, callback){
    Article.findById(article_id, function (err, article) {
        if (err) {
            return callback(err, null)
        } else if (is_moderator === true){
            // If editor is an moderator; publish the pending edit at once
            try{
                article.history_articles.push(article.current_article);
                article.history_articles.forEach(mongoose.Types.ObjectId);
                article.current_article =  mongoose.Types.ObjectId(pending_article._id);
                article.rejected_articles = article.rejected_articles.concat(article.pending_articles);
                article.rejected_articles.forEach(mongoose.Types.ObjectId);
                article.author_list.push(pending_article.editor_id);
                article.author_list.forEach(mongoose.Types.ObjectId);
                article.content = pending_article.content;
                article.title = pending_article.title;
                article.tags = pending_article.tags;
                article.tools = pending_article.tools;
                article.subjects = pending_article.subjects;
                article.pending_articles = [];
                article.save(callback);
            }catch (e) {
                console.log(e);
                callback(e);
            }
        } else{
            article.pending_articles.push(pending_article._id);
            // article.pending_articles.append(pending_article._id);
            let pending_articles = article.pending_articles.forEach(mongoose.Types.ObjectId)
            Article.findByIdAndUpdate(article_id, {pending_articles: pending_articles,is_pending: true},callback);
        }
    });
}

exports.findArticleByPendingArticleId = function (pending_id, callback) {
    if (!pending_id) {
        return callback("Error: pending_id undefined");
    }
    Article.find({pending_article:mongoose.Types.ObjectId(pending_id)}, callback);
};


exports.findPendingArticleByUserId = function (id, callback) {
    if (!id) {
        return callback("Error: user id undefined");
    }
    PendingArticle.find({editor_id:mongoose.Types.ObjectId(id)}, callback);
}


exports.findPublishedArticleByUserId = function (id, callback) {
    if (!id) {
        return callback("Error: user id undefined");
    }
    Article.find({author_id:mongoose.Types.ObjectId(id)}, callback);
}

exports.likeArticle = async (article_id, user_id, callback) => {
    if (!user_id||!article_id) {
        return callback("Error: user id or article id is not undefined");
    }
    let article = await Article.findById(article_id)
    if (article.likes.includes(user_id)){
        
        return callback("Error: uer has liked the article!");
    }
    console.log("ah:"+article.likes.includes(user_id))
    article.likes.push(user_id)
    console.log("update the likes of article...");
    await article.save(callback)

    
}