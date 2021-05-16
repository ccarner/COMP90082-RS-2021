const {User} = require('../models/user');
const bcrypt = require("bcrypt");


module.exports = async function(res){

    const rootUser = {
        account: "admin2",
        password: "admin2",
        student_number: 1111111,
        is_moderator: true,
        is_admin: true
    }

    try {
        const user = await User.findOne({account : "admin2"});

        if (user){
            console.log('existed the root account, no need to create');
            return;
        }
        console.log('creating the root user');
        const admin = new User(rootUser);
        
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        await admin.save();
    
    } catch (ex) {
        console.error('error',ex.message);
    }

}