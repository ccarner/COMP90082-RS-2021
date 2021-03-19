var User = require('../proxies/user');

var user = {
    account: "admin",
    password: "admin",
    student_number: 845462,
    is_moderator: true,
    is_admin: true
}

const addDefaultAdmin = User.newAndSave(user, (err, result) => {
    if(err){
        console.log("error: unable to add default admin", err)
    } else {
        console.log("success: added the default admin")
    }
})

module.exports = addDefaultAdmin;
