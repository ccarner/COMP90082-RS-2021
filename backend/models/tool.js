var mongoose  = require('mongoose')
var Schema    = mongoose.Schema
var Section = require('./section')

var ToolSchema = new Schema({
    name: { type: String, unique: true, required: true},
    articles: [Schema.Types.ObjectId],
    description:{type: String},
    comment: {type: Schema.Types.ObjectId}
  })
/**
 * middleware function to cascade delete sections of a tool
 */
ToolSchema.pre('remove', async function(next) {
    await Section.deleteMany({owner: this._id})
    next()
})

// ToolSchema.pre('save', async function(next) {
//   if(this.isModified("articles")){
    
//   }
//   next()
// })

mongoose.model('Tool', ToolSchema);