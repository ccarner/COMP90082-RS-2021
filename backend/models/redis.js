// // cache.js
// const redis = require('redis')
// const client = redis.createClient()
//
// //connect fail callback
// client.on('error',function(err){
//     console.log("Redis connect failed:",err)
// })
//
// client.on('ready', function () {
//     console.log('redisCache connection succeed');
// });
//
// class Cache{
//     set(key,value,expire){
//
//         return new Promise(function(callback,errback){
//
//             client.set(key,value,function(err,result){
//                 if(err){
//                     console.log(err)
//                     return
//                 }
//
//                 if (!isNaN(expire) && expire > 0) {
//                     client.expire(key, parseInt(expire));
//                 }
//
//                 callback(result)
//             })
//         })
//     }
//
//     get(key){
//         return new Promise(function(callback,errback){
//             client.get(key,function(err,result){
//                 if(err) return
//
//                 callback(result)
//             })
//         })
//     }
// }
//
// module.exports = Cache