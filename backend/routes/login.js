const express = require('express');
const router = express.Router();

const User = require('../proxies/user');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');

// this value should be secret and saved somewhere else
const TOKEN_SECRET = 'THIS_IS_SECRET'

// login page
router.post('/', async (req, res) =>{
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