var mongoose = require('mongoose');
var dbRoute = process.env.MONGODB_URI||'mongodb+srv://root:root@cluster0.uhlwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(dbRoute, {
    poolSize: 20,
    useCreateIndex: true,
    useNewUrlParser: true
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


// cache.js
const redis = require('redis');
const config = require('config');
const logger = require('winston');

const redisObj = {
    client: null,
    connect: function () {
        this.client = redis.createClient(config.redis);
        this.client.on('error', function (err) {
            logger.error('redisCache Error ' + err);
        });
        this.client.on('ready', function () {
            logger.info('redisCache connection succeed');
        });
    },
    init: function () {
        this.connect();
        const instance = this.client;


        const get = instance.get;
        const set = instance.set;
        const setex = instance.setex;

        instance.set = function (key, value, callback) {
            if (value !== undefined) {
                set.call(instance, key, JSON.stringify(value), callback);
            }
        };

        instance.get = function (key, callback) {

            get.call(instance, key, (err, val) => {
                if (err) {
                    logger.warn('redis.get: ', key, err);
                }
                callback(null, JSON.parse(val));
            });

        };

        instance.setex = function (key, value, callback) {
            if (value !== undefined) {
                setex.call(instance, key, config.cache.maxAge, JSON.stringify(value), callback);
            }
        };

        return instance;

    },
};


module.exports = redisObj.init();



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

