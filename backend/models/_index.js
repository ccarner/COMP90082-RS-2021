const config = require('config');
var mongoose = require('mongoose');
var dbRoute = config.get('db');

mongoose.connect(dbRoute, {
    poolSize: 20,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
    console.log(err.stack);
    process.exit(1);
    }
});
  
var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connnection error:'));

db.once('open',function(){
    console.log('db connected')
});






  // models
require('./user');
require('./subject');
require('./tool');
require('./article');
require('./comment');
require('./notification');
require('./section')

exports.User    = mongoose.model('User');
exports.Subject = mongoose.model('Subject');     
exports.Tool    = mongoose.model('Tool');
exports.Article = mongoose.model('Article');
exports.PendingArticle = mongoose.model('PendingArticle');
exports.Comment = mongoose.model('Comment');
exports.Notification = mongoose.model('Notification');
exports.Section = mongoose.model('Section')