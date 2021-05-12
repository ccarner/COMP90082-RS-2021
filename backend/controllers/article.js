const Article = require('../proxies/article');
const User = require('../proxies/user');
const Subject = require('../proxies/subject');
const Tool = require('../proxies/tool');
const Joi = require('joi');

const mongoose = require('mongoose');
/**
 *  Compared with "publishTheArticle", "publishTheArticle2" is used for sprint 2. Different point: one polished article has a list of pending articles
 * @param req
 * @param res
 * @param callback
 *  further do: connect to subjects and tools part
 */
exports.publishTheArticle2 = (req,res, callback) => {
    // First create pending article
    let data = req.body;
    data.editor_id = req.user._id; // editor_id for pending article
    // Create a pending article first  
    Article.newPendingArticle(data, function (err, pending_article) {
        if (err) {
            return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
        }
        //console.log('new pending article saved')
        if (data.article_id){
            Article.editExistingArticle(data.article_id, pending_article, req.user._moderator, function (err, article) {

                const validateResult = validate(req)
                if(validateResult.error){
                    return res.json({ success: false, error_info: error.details[0].message });
                }

                if (err) {
                    return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                }else{
                    return res.json({ success: true, error_info: err, article_id: article._id, auth_token: req.header('auth-token')});
                }
            });
        } else{
            Article.newAndSave2(!req.user._moderator, pending_article, function (err, article) {

                const validateResult = validate(req)
                if(validateResult.error){
                    return res.json({ success: false, error_info: error.details[0].message });
                }

                if (err) {
                    return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                }else{
                    console.log('new article submitted')
                    return res.json({ success: true, error_info: err, article_id: article._id, auth_token: req.header('auth-token')});
                }
            });
        }
    });
}

/**
 * Compared with "publishTheArticle2", "publishTheArticle" is used for sprint 3. Change: one polished article has ar most one pending article
 * @param req
 * @param res
 * @param callback
 *  further do: connect to subjects and tools part
 */
exports.publishTheArticle = (req,res, callback) => {
    // First create pending article
    let data = req.body;
    data.editor_id = req.user._id; // editor_id for pending article

    // when the user is a moderator
    if(req.user._moderator){
        //when the article is exist, update to published articles collection directly
        data.is_pending= false;
        if(data.article_id){
            // first, update published article
            Article.updateArticle(data.article_id,data,function (err, article) {
                if (err) {
                    return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                }else{
                    console.log('new article submitted');
                    return res.json({ success: true, error_info: err, article_id: article._id, auth_token: req.header('auth-token')});
                }
            });

            // second, delete pending article
            Article.deletePendingArticleByPublishedArticleId(data.article_id);
        }else{    // when the article does not exist ,save to published articles collection directly
            Article.newAndSave(data, function (err, article) {

                const validateResult = validate(req)
                if(validateResult.error){
                    return res.json({ success: false, error_info: error.details[0].message });
                }

                if (err) {
                    console.log(err)
                    return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                }else{
                    console.log('new article created and submitted')
                    return res.json({ success: true, error_info: err, article_id: article._id, auth_token: req.header('auth-token')});
                }
            });
        }
    }else {  // save to pending articles collection directly
        if(data.article_id){
            Article.updateArticle(data.article_id, {is_pending:true}, function (err, article) {
                if (err) {
                    return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                }else{
                    // delete the pending article
                    return res.json({success:true, auth_token: req.header('auth-token')});
                }
            })
        }
        Article.newPendingArticle(data,function (err, article) {

            const validateResult = validate(req)
            if(validateResult.error){
                return res.json({ success: false, error_info: error.details[0].message });
            }

            if (err) {
                return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
            }else{
                console.log('new article submitted');
                return res.json({ success: true, error_info: err, article_id: article._id /*,auth_token: req.header('auth-token')*/});
            }
        });
    }

}

/**
 *
 * @param req
 * @param res
 * @param callback
 */
exports.getTheArticle = (req,res,callback) =>{
    
    Article.getArticleById(req.params.id, function(err, article) {
        if(err || article === null){
            return res.json({success:false, error_info:"the article is not exist", auth_token: req.header('auth-token')});
        } else {
            article.like_number = article.likes.length
            article.is_like = false
                if(article.likes.includes(req.user._id)){
                    article.is_like = true
                }
            return res.json({success:true, returnValuesForArticle: article, auth_token: req.header('auth-token')});
        }
    })
}

exports.getTheArticle2 = (req,res,callback) =>{

    Article.getArticleById(req.params.id, function(err, article) {
        if(err || article === null){
            return res.json({success:false, error_info:'Article does not exist!', auth_token: req.header('auth-token')});
        }
        let returnValuesForArticle = {};
        returnValuesForArticle.title = article.title;
        returnValuesForArticle.like_number = article.likes.length;
        returnValuesForArticle.create_at = article.create_at;
        returnValuesForArticle.content = article.content;
        returnValuesForArticle.comments = article.comments;
        returnValuesForArticle.id = req.params.id;
        returnValuesForArticle.is_liked = false;
        returnValuesForArticle.current_article = article.current_article;
        returnValuesForArticle.pending_article = article.pending_articles;
        returnValuesForArticle.rejected_articles = article.rejected_articles;
        returnValuesForArticle.history_articles = article.history_articles;
        returnValuesForArticle.subjects = article.subjects;
        returnValuesForArticle.tags = article.tags;
        returnValuesForArticle.tools = article.tools;
        // IF
        if(article.current_article){
            User.getUserById2(article.author_list[0], function(err, user) {
                if(err){
                    returnValuesForArticle.author = 'deleted account';
                    return res.json({success:false, returnValuesForArticle:returnValuesForArticle, auth_token: req.header('auth-token')});
                }
                returnValuesForArticle.author = user.name;
                console.log(user.name)
                for(const likeId of article.likes){
                    if(likeId === req.user._id){
                        returnValuesForArticle.wether_like =true;
                        break;
                    }
                }
                return res.json({success:true, returnValuesForArticle:returnValuesForArticle, auth_token: req.header('auth-token')});
            });
        }
        else return res.json({success:false, error_info: 'This article have not been approved by the moderator yet', returnValuesForArticle:returnValuesForArticle, auth_token: req.header('auth-token')});
    })
}

/**
 *
 * @param req
 * @param res
 * @param callback
 * @constructor
 */
exports.CreateAnArticle = (req,res,callback) =>{
    Subject.getAllSubjects(function (error,subjects) {
        if(error){
            return res.json({success:false, error_info:"create wrong", auth_token: req.header('auth-token')});
        }
        Tool.getAllTools(function (error,tools) {
            if(error){
                return res.json({success:false, error_info:"create wrong", auth_token: req.header('auth-token')});
            }
            let subjectsName = [];
            let toolsName = [];

            for (const subject of subjects){
                subjectsName.push(subject.subject_code);
            }

            for(const tool of tools){
                toolsName.push(tool.name);
            }
            return res.json({success:true,is_exist:false,tagsForSubjects:subjectsName, auth_token: req.header('auth-token')});

        })
    })
}

/**
 *
 * @param req
 * @param res
 * @param callback
 */
exports.deleteTheArticle = (req,res,callback) =>{
    if(!req.user._moderator){
        return res.json({success:false, reason:"student have no authority to delete", auth_token: req.header('auth-token')});
    }else {
        Article.deleteArticleById(req.params.id,function (error,article) {
            if(error){
                return res.json({success:false, reason:"delete wrong", auth_token: req.header('auth-token')});
            }else{
                return res.json({success:true, reason:"success", auth_token: req.header('auth-token')});
            }
        })
    }
}

/**
 * Submit a new edit to an article
 * @param req
 * @param res
 * @param callback
 * @returns {any}
 * further do: check the authority
 */
/**
 *
 * @param req
 * @param res
 * @param callback
 * @returns {any}
 * further do: check the authority
 */
exports.editTheArticle= (req,res,callback) =>{
    Subject.getAllSubjects(function (error,subjects) {
        if(error){
            return res.json({success:false, error_info:"create wrong", auth_token: req.header('auth-token')});
        }
        Tool.getAllTools(function (error,tools) {
            if(error){
                return res.json({success:false, error_info:"create wrong", auth_token: req.header('auth-token')});
            }
            let subjectsName = [];
            let toolsName = [];

            for (const subject of subjects){
                subjectsName.push(subject.subject_code);
            }

            for(const tool of tools){
                toolsName.push(tool.name);
            }
            let returnValuesForArticle = {};
            Article.getArticleById(req.params.id, function (err, article) {
                if (err || article === null) {
                    return res.json({success: false, error_info: "the article is not exist", auth_token: req.header('auth-token')});
                }else{
                    if(article.is_pending === true){
                        return res.json({success:false,err_info:"already a pending article, cannot edit", auth_token: req.header('auth-token')});
                    }
                    returnValuesForArticle.title = article.title;
                    returnValuesForArticle.content = article.content;
                    returnValuesForArticle.id = req.params.id;
                    return res.json({success:true,tagsForSubjects:subjectsName, tagsForTools:toolsName,returnValuesForArticle, auth_token: req.header('auth-token')});
                }

            })
        })
    })
}

/**
 *
 * @param req
 * @param res
 * @param callback
 */
exports.editThePendingArticle= (req,res,callback) =>{
    let returnValuesForArticle = {};
    Article.getPendingArticleById(req.params.id, function (err, article) {
        if (err || article === null) {
            return res.json({success: false, error_info: "this pending article does not exist,the article has been processed by moderator just now", auth_token: req.header('auth-token')});
        }else{
            if(article.editor_id!= null && article.editor_id.toString() === req.user._id){
                returnValuesForArticle.title = article.title;
                returnValuesForArticle.content = article.content;
                returnValuesForArticle.id = req.params.id;
                return res.json({success:true,returnValuesForArticle, auth_token: req.header('auth-token')});
            }else {
                return res.json({success:false,error_info:"only the creator of this article can edit", auth_token: req.header('auth-token')});
            }

        }
    })
}

/**
 *
 */
exports.getAllNamesOfTheArticles= (req,res,callback) =>{
    Article.getAllArticles(function (error,articles) {
        if(error){
            return res.json({success:false, error_info:"cannot get articles name", auth_token: req.header('auth-token')});
        }
        let articleInfo = [];
        for(const article of articles){
            if(article.tags.includes(req.params.subject_code_Or_Tool_name)){
                let temp ={};
                temp.name = article.title;
                temp.id = article.id
                articleInfo.push(temp)
            }
        }
        return res.json({success:true, articles:articleInfo, auth_token: req.header('auth-token')});
    })
}
exports.approvePendingArticle = (req,res,callback)=>{
    if(req.user._moderator){
        let pending_id = req.params.pending_id;
        // find the pending article
        Article.getPendingArticleById(pending_id, function (error,pending_article) {
            if(error){
                return res.json({success:false, error_info:error, auth_token: req.header('auth-token')});
            }else{
                const update = pending_article
                if(pending_article.editor_id != null) {
                    update.author_id = mongoose.Types.ObjectId(pending_article.editor_id);
                }
                update.is_pending = false;
                if(pending_article && pending_article.published_article){
                    Article.updateArticle(pending_article.published_article, update,function (err, article) {
                        if (err) {
                            return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                        }else{
                            Article.deletePendingArticleById(req.params.pending_id, function (error) {
                                if(error){
                                    return res.json({success:false, error_info:error, auth_token: req.header('auth-token')});
                                }else{
                                    return res.json({ success: true, article: article, auth_token: req.header('auth-token')});
                                }
                            })
                        }
                    });
                }else if(pending_article){
                    Article.newAndSave(update, function(err, article){

                        const validateResult = validate(req)
                        if(validateResult.error){
                            return res.json({ success: false, error_info: error.details[0].message });
                        }

                        if (err) {
                            return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                        }else{
                            Article.deletePendingArticleById(req.params.pending_id, function (error) {
                                if(error){
                                    return res.json({success:false, error_info:error, auth_token: req.header('auth-token')});
                                }else{
                                    return res.json({ success: true, article: article, auth_token: req.header('auth-token')});
                                }
                            });
                        }
                    });
                }
                else{
                    return res.json({success:false, error_info: "pending article does not exist", auth_token: req.header('auth-token')});

                }
            }
        })
        // if a moderator is doing this operation, error
    }else{
        return res.json({success:false, error_info:"Only moderators can reject articles", auth_token: req.header('auth-token')});
    }
}


exports.rejectPendingArticle = (req,res,callback) =>{
    // if a moderator is doing this operation, psroceed
    if(req.user._moderator){
        let pending_id = req.params.pending_id;
        // find the pending article
        Article.getPendingArticleById(pending_id, function (error,pending_article) {
            if(error){
                return res.json({success:false, error_info:error, auth_token: req.header('auth-token')});
            }else{
                // delete the pending article
                Article.deletePendingArticleById(req.params.pending_id, function (error,articles) {
                    if(error){
                        return res.json({success:false, error_info:error, auth_token: req.header('auth-token')});
                    }else{
                        // if the pending article is attached to an published pending article, update the pending state of the article
                        if(pending_article&&pending_article.published_article){
                            Article.updateArticle(pending_article.published_article, {is_pending:false}, function (err, article) {
                                if (err) {
                                    return res.json({ success: false, error_info: err, auth_token: req.header('auth-token')});
                                }else{
                                    // delete the pending article
                                    return res.json({success:true, auth_token: req.header('auth-token')});
                                }
                            })
                        // if the pending article have not been published, done
                        }else if (pending_article){
                            return res.json({success:true, auth_token: req.header('auth-token')});
                        }
                        else{
                            return res.json({success:false, error_info: "pending article does not exist", auth_token: req.header('auth-token')});
                        }
                    }
                });
            }
        })
    // if a moderator is doing this operation, error
    }else{
        return res.json({success:false, error_info:"Only moderators can reject articles", auth_token: req.header('auth-token')});
    }
}


exports.getThePendingArticle = (req,res,callback) =>{
    if(req.user._moderator){
        Article.getPendingArticleById(req.params.id, function(err, article) {
            if(err || article === null){
                return res.json({success:false, error_info:"the article has been processed by other moderator", auth_token: req.header('auth-token')});
            }
            User.getUserById2(article.editor_id, function(err, user) {
                if(err){
                    return res.json({success:false, error_info:"the article has been processed by other moderator", auth_token: req.header('auth-token')});
                }else{
                    let returnValuesForArticle = {};
                    returnValuesForArticle.title = article.title;
                    if(user ==null){
                        returnValuesForArticle.author = "anonymity";
                    }else{
                        returnValuesForArticle.author = user.name;
                    }
                    returnValuesForArticle.date = article.edited_at;
                    returnValuesForArticle.content = article.content;
                    returnValuesForArticle.id = req.params.id;
                    returnValuesForArticle.subjects = article.subject;
                    returnValuesForArticle.tools = article.tools;
                    returnValuesForArticle.tags = article.tags;

                    return res.json({success:true, returnValuesForArticle:returnValuesForArticle, auth_token: req.header('auth-token')});
                }
            });
        })
    }else {
        return res.json({success:false, error_info: "student have no author to get details of pending article", auth_token: req.header('auth-token')});
    }
}


exports.getNamesOfPendingArticles= (req,res,callback) =>{
    Article.getAllPendingArticles(function (error,articles) {
        if(error){
            return res.json({success:false, error_info:"cannot get articles name", auth_token: req.header('auth-token')});
        }
        let articleInfo = [];
        for(const article of articles){
            if(article.tags.includes(req.params.subject_code_Or_Tool_name)){
                let temp ={};
                temp.name = article.title;
                temp.id = article.id
                articleInfo.push(temp)
            }
        }
        return res.json({success:true, articles:articleInfo, auth_token: req.header('auth-token')});
    })
}



exports.getPendingArticlesByUserId = (req,res,callback) =>{
    Article.findPendingArticleByUserId(req.user._id, function (error,articles) {
        if(error){
            return res.json({success:false, error_info:"cannot get all pending articles for this user", auth_token: req.header('auth-token')});
        }
        let articleInfo = [];
        for(const article of articles){
            let temp ={};
            temp.name = article.title;
            temp.id = article.id
            articleInfo.push(temp)
        }
        return res.json({success:true, articles:articleInfo, auth_token: req.header('auth-token')});
    })
}

exports.getPublishedArticlesByUserId = (req,res,callback) =>{
    Article.findPublishedArticleByUserId(req.user._id, function (error,articles) {
        if(error){
            return res.json({success:false, error_info:"cannot get all published articles for this user", auth_token: req.header('auth-token')});
        }
        let articleInfo = [];
        for(const article of articles){
            let temp ={};
            temp.name = article.title;
            temp.id = article.id
            articleInfo.push(temp)
        }
        return res.json({success:true, articles:articleInfo, auth_token: req.header('auth-token')});
    })
}

//
function validate(req) {
    const schema = {
        title: Joi.string().min(3).max(25).required(),
        content: Joi.string().min(25).required(),
        tags: Joi.string().min(3).max(25)
    };
    return Joi.validate(req.body, schema);
}

