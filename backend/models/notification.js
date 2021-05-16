let mongoose  = require('mongoose');
let Schema    = mongoose.Schema;

let NotificationSchema = new Schema({
    article: {type: Schema.Types.ObjectId}, 
    user: {type: Schema.Types.ObjectId},
    content: {type: Schema.Types.ObjectId},
    create_at: { type: Date, default: Date.now },
  });

const Notification = new mongoose.model('Notification', NotificationSchema);
exports.Notification = Notification;