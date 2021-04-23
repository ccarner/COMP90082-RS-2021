var mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const {User} = require('./user')
const {Section} = require('./section')

var ArticleSchema = new Schema({
    title: { type: String, unique: true, required: true},
    author_id: {type: Schema.Types.ObjectId},
    content: { type: String},
    //url: { type: String },

    subjects: [String],
    tools: [String],
    tags: [String],
    create_at: { type: Date, default: Date.now },

    is_pending: {type: Boolean, default: false},     // Whether there are pending articles under this article
    //pending_article: {type: Schema.Types.ObjectId},      // Article that is currently pending
    // rejected_articles:[Schema.Types.ObjectId],      // Articles that has been rejected by the moderator
    // history_articles:[Schema.Types.ObjectId],       // A list of History versions

    likes: [Schema.Types.ObjectId],
    last_commented_at: {type: Date},
    comment_section:{type: Schema.Types.ObjectId, ref: 'Section'}
});

ArticleSchema.pre('save', async function(next){
    let author = User.findById(this.author_id)
    this.author_name = author.name || 'anonymity'
    let section = new Section({name: 'Comment', type: 'Comment', owner: this._id})
    await section.save()
    section = await Section.findOne({owner: this._id})
    this.comment_section = section._id
    next()
})

var PendingArticleSchema = new Schema({
    title: { type: String, required: true},
    editor_id: { type: Schema.Types.ObjectId },
    content: { type: String},
    published_article: {type: String}, // Article that is currently published
    subjects: [String],
    tools: [String],
    tags: [String],
    // status:  {
    //     type: String,
    //     enum: ['Pending', 'Rejected', 'CurrentVersion','HistoryVersion'],
    //     default: 'Pending',
    // },
    edited_at: { type: Date, default: Date.now },
    //reject_reason: { type: String},
});

const PendingArticle = new mongoose.model('PendingArticle', PendingArticleSchema);


exports.Article = new mongoose.model('Article', ArticleSchema);
exports.PendingArticle = PendingArticle;

