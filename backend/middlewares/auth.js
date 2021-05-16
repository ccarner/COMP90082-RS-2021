const jwt = require("jsonwebtoken");
const config = require("config");
const TOKEN_SECRET = config.get('jwtPrivateKey');
const {User} = require('../models/user');

module.exports = async function(req, res, next) {
    const token = req.header('auth-token');
    
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, TOKEN_SECRET)
        let mtoken = jwt.decode(token);
        req.user = verified;
        let login_user= await User.findOne({_id: req.user._id});
        if (!login_user){
            return res.status(400).send('User is not found');
        }
        next();
    }catch(e){
        res.status(400).send('Invalid token');
    }
}