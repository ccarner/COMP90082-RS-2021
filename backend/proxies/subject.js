const models = require('../models');
const Subject = models.Subject;
const mongoose = require('mongoose');

/**
 * Add a new subject to the database
 * Callback:
 * - err, error in database
 * - subject, the subject
 * @param {String} name           the name of the subject
 * @param {String} subject_code   the account of the user
 * @param {Function} callback     the callback function
 */
exports.newAndSave = function (name, subject_code, description = undefined, creator_id, callback) {
    var subject            = new Subject();
    subject.name           = name;
    subject.subject_code   = subject_code.toUpperCase();
    subject.description    = description;
    subject.created_by     = creator_id;

    subject.save(callback);
};
/**
 * get a subject by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} subject_id the ID of a subject
 * @param {function} callback  the call back function
 */
exports.getSubjectById = async (subject_id, callback) => {
    await Subject.findById(subject_id, callback).populate({path: 'sections', 
    populate: {path: 'comments', populate: {path: 'leaf_comments'}}}).exec()
}
/**
 * get a subject by its name
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} name the name of a subject
 * @param {function} callback  the call back function
 */
exports.getSubjectByName = async (name, callback) => {
    await Subject.find({'name':{ $regex: name, $options: "i" }}, callback).populate({path: 'sections', 
    populate: {path: 'comments', populate: {path: 'leaf_comments'}}}).exec()
}
/**
 * get a subject by its code
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} subject_code the code of a subject
 * @param {function} callback  the call back function
 */


/**
 *  this function getting subject by id is used for synchronization problem
 * @param subject_Name
 * @returns {Promise<*>}
 */
exports.getSubjectById2 = async function (id) {
    let data = await Subject.findOne({_id:mongoose.Types.ObjectId(id)});
    return data;
}

exports.getSubjectbyCode = async (subject_code, callback) => {
    await Subject.findOne({'subject_code':{ $regex: subject_code, $options: "i" }}, callback).populate({path: 'sections', 
    populate: {path: 'comments', populate: {path: 'leaf_comments'}}}).exec()
}

 /**
 * Query all subjects in the database
 * Callback:
 * - err, error in database
 * - subjects, the subjects
 */
exports.getAllSubjects = async (callback) => {
    await Subject.find(callback);
}

/**
 * delete a subject by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} subject_id the ID of a subject
 * @param {function} callback  the call back function
 */
exports.deleteSubject = async (subject_id, callback) => {
    try{
        const subject = await Subject.findById(subject_id)
        await subject.remove()
        callback(undefined, "Successfully delete the subject")
    } catch (e){
        callback(e, undefined)
    }

}
/**
 * add a section to the subject by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} subject_id the ID of a subject
 * @param {ObjectID} section_id the ID of a section
 * @param {function} callback  the call back function
 */
exports.addSection = async (subject_id, section_id, callback) => {
    let subject = await Subject.findById(subject_id)
    subject.sections.push(section_id)
    await subject.save(callback)
}
/**
 * updates a subject by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} subjectBody  the properties that need to be updated
 * @param {function} callback  the call back function
 */
exports.updateSubject = async (subjectBody, callback) => {
    const subjectId = subjectBody._id
    delete subjectBody["_id"]
    const updates = Object.keys(subjectBody)
    const allowedUpdates = ['name', 'subject_code', 'description', 'sections']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return callback("Invalid Update", undefined)
    }

    try {
        let subject = await Subject.findOne({ _id: subjectId})


        if (!subject) {
            return callback("Invalid Update: Unable to find the subject", undefined)
        }

        updates.forEach((update) => subject[update] = subjectBody[update])
        await subject.save()
        return callback(undefined, subject)
    } catch (e) {
        return callback("Invalid Update"+e, undefined)
    }
}