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

        this.client.expire('key',60, function () {
            logger.info('redisCache restart')
        });

    },
    init: function () {
        this.connect();
        const instance = this.client;

        const get = instance.get;
        const set = instance.set;
        // const setex = instance.setex;
        const del = instance.del;

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

        instance.del=function(key,callback){
            del.call(instance,key,(err,val)=>{
                if (err){
                    logger.warn('redis.del: ', key, err);
                }
            });
        };

        return instance;
    },
};

module.exports = redisObj.init();
