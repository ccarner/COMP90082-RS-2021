const {User} = require('../models/user');
const bcrypt = require("bcrypt");

module.exports = async function(){
    const rootUser = {
        account: "admin2",
        password: "admin2",
        student_number: 1111111,
        is_moderator: true,
        is_admin: true
    }
    try {
        let user = await User.findOne({account : rootUser.account, student_number: rootUser.student_number });

        if (user){
            console.log('existed the root account, no need to create');
            return;
        }

        user = new User(rootUser);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    
        const token = user.generateAuthToken();
    
        res
          .header("x-auth-token", token)
          .header("access-control-expose-headers", "auth-token")
          .send(_.pick(user, ["_id", "account", "student_number"]));  

          console.log('created a new root user');
        
    } catch (ex) {
        console.error('error',ex.message);
    }

}