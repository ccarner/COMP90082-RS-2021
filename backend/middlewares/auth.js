const jwt = require("jsonwebtoken");
const config = require("config");
const TOKEN_SECRET = config.get('jwtPrivateKey');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, TOKEN_SECRET)
        var mtoken = jwt.decode(token);
        req.user = verified;
        next();
    }catch(e){
        res.status(400).send('Invalid token');
    }
}