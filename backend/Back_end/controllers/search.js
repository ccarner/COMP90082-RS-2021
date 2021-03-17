const Article = require('../proxies/article');
const User = require('../proxies/user');
const Subject = require('../proxies/subject');
const Tool = require('../proxies/tool');

exports.query = (req,res,callback) =>{
    let returnValues = [];

    let query = req.query.q;
    let words = query.split(" ");

    let type = req.query.type;
    if (req.query.type !== undefined) {
        type = req.query.type;
    } else {
        type = "";
    }
    

    Article.getAllArticles(function(err, articles) {
        
        if(err || articles === null){
            return res.json({success:false, error_info:'No articles2', auth_token: req.header('auth-token')});
        }

        var levenshtein = require('fast-levenshtein');
        
        for (const article of articles) {
            let terms = []

            if (type === "" || type === "tag") {
                for (const tag of article.tags) {
                    if (article.tags !== undefined && article.tags !== null) {
                    terms.push(tag.toLowerCase());
                    }
                }
            }

            if (type === "" || type === "article") {
                if (article.title !== undefined && article.title !== null) {
                    terms.push(article.title.toLowerCase());
                }
            }

            if (type === "" || type === "subject") {
                if (article.subject !== undefined && article.subject !== null) {
                    terms.push(article.subject.toLowerCase());
                }
            }

            for (const word of words) {

                for (const term of terms) {
                    
                    var distance = levenshtein.get(word.toLowerCase(), term);
                    if (distance < 3) {
                        let returnValuesForSearch = {};
                        returnValuesForSearch._id = article._id;
                        returnValuesForSearch.title = article.title;
                        returnValuesForSearch.like_number = article.likes.length;
                        returnValuesForSearch.date = article.create_at;
                        returnValuesForSearch.subjects = article.subject;
                        returnValuesForSearch.tools = article.tools;
                        returnValuesForSearch.tags = article.tags;                 
                        returnValues.push(returnValuesForSearch); 
                        break; 
                    }
                }
          
            }
        }

        return res.json({success:true, articles:returnValues, auth_token: req.header('auth-token')});
    })
}



