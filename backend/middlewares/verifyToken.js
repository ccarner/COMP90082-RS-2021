const jwt = require('jsonwebtoken');

// this value should be secret and saved somewhere else
// const TOKEN_SECRET = 'THIS_IS_SECRET'
const config = require("config");
const TOKEN_SECRET = config.get('jwtPrivateKey');


exports.verify = function(req,res, next){
    const token = req.header('auth-token');
    
    console.log(token)
    if(!token) return res.status(401).send('Access Denied');

    try{
        console.log("verifying token");
        const verified = jwt.verify(token, TOKEN_SECRET)
        var mtoken = jwt.decode(token);
        console.log(mtoken);
        req.user = verified;
        next();
    }catch(e){
        console.log(e)
    }
}
