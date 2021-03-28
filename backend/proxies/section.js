const {Section} = require('../models/section');
const mongoose = require('mongoose');
/**
 * Add a new section to the database
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {JSON} section the properties of a section
 * @param {Function} callback  the callback function
 */
exports.newAndSave = async function (section, callback){
    if(section.subject_code){
        section.subject_code = section.subject_code.toUpperCase();
    }
    
    const newSection = new Section(section);

    await newSection.save(callback);
}

/**
 * delete a section by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} section the properties of a section
 * @param {function} callback  the call back function
 */
exports.deleteSection = (section, callback) => {
    Section.deleteOne({_id: section._id}, function(err, result){
        if(err || !result.deletedCount ) {
            callback(err, result)
        } else {
            callback(undefined, "Successfully delete the section")
        }
    })
}
// TODO: the following functions 
// the following three functions could be combined into one in which 
// the type of the section need to be checked
// exports.addTool
// exports.addComment
// exports.addArticle

 /**
 * Query a section based on the objectId of a subject
 * Callback:
 * - err, error in database
 * - section, the section
 * @param {String} subject_code the code of the subject
 * @param {Function} callback the callback function
 */
exports.getSectionbySubjectCode = function(subject_id, callback){
    if(!subject_code){
        return callback();
    } 
    Section.find({_id: subject_id}, callback);
}