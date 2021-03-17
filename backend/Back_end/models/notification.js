var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var NotificationSchema = new Schema({
    article: {type: Schema.Types.ObjectId}, 
    user: {type: Schema.Types.ObjectId},
    content: {type: Schema.Types.ObjectId},
    create_at: { type: Date, default: Date.now },
  });

  mongoose.model('Notification', NotificationSchema);