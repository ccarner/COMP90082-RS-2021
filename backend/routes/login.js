const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../proxies/user');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// this value should be secret and saved somewhere else
const TOKEN_SECRET = config.get('jwtPrivateKey');

// login page
router.post('/', async (req, res) =>{
    const schema = Joi.object().keys({
        account: Joi.string().min(5).max(15).required(),
        password: Joi.string().min(5).max(15).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.json({ success: false, error: error.details[0].message});
    }
    const account = req.body.account
    const userPassword = req.body.password
    
    const CurrentUser = User.getUserByAccount(account, async function(err, user){
        if(user == null){
            res.json({ success: false, error: 'No such user'});
        } else {
            const match = await bcryt.compare(String(userPassword), String(user.password));
            if(match){
                // console.log("User id " + user.id)
                // console.log("Is moderator " + user.is_moderator)
                const isAdmin = user.isAdmin || false

                const token = jwt.sign({_id: user.id, _moderator: user.is_moderator, _admin: isAdmin}, TOKEN_SECRET);
                
                // console.log(token)
                // res.header('auth-token', token).send(token);
                res.json({ success: true, token: token, id: user.id, name:user.name, is_moderator: user.is_moderator, is_admin: user.is_admin});
                // res.json({ success: true, error: 'Success login'});
            } else {
                return res.json({ success: false, error: 'Wrong password'});
            }
        }
    })
});

module.exports = router;