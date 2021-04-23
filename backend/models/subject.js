let mongoose  = require('mongoose')
let Schema    = mongoose.Schema
let Section = require('./section')

let SubjectSchema = new Schema({
    name: { type: String, unique: true, required: true},
    subject_code: { type: String, unique: true, required: true},
    description:{type:String},
    sections: [{type: Schema.Types.ObjectId, ref: 'Section'}],
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}
  })


/**
 * middleware function to cascade delete sections of a subject
 */
SubjectSchema.pre('remove', async function(next) {
    await Section.deleteMany({owner: this._id})
    next()
})
/**
 * middleware function to verify the number of sections of a subject
 * delete those sections which have been modified in front end
 */
SubjectSchema.pre('save', async function(next) {
    if(this.isModified("sections")){
        const sections = await Section.find({subject_code: this.subject_code})
        let result = sections.map(sections => sections._id);
        let difference = result.filter(x => !this.sections.includes(x))
        await Section.deleteMany({_id: difference})
    } 
    next()
})



const Subject = new mongoose.model('Subject',SubjectSchema)
exports.Subject = Subject;