const {Tool} = require('../models/tool');

const mongoose = require('mongoose');

/**
 * Add a new tool to the database
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {JSON} tool the properties of a tool
 * @param {Function} callback  the callback function
 */
exports.newAndSave = async (tool, callback) => {
    const newTool = new Tool(tool);
    await newTool.save(callback);
};
/**
 * get a tool by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} tool_id the ID of a tool
 * @param {function} callback  the call back function
 */
exports.getToolById = async (tool_id, callback) => {
    await Tool.findById(tool_id, callback)
}
/**
 * get a tool by its name
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} name the name of a tool
 * @param {function} callback  the call back function
 */
exports.getToolsByName = async (name, callback) => {
    await Tool.find({'name':{ $regex: name, $options: "i" }}, callback)
}


/**
 *
 * @param name
 */
exports.getToolsByName2 = function (name) {
    let data = Tool.findOne({'name':name});
    return data;
}
/**
 * get all tools
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {function} callback  the call back function
 */
exports.getAllTools = async (callback) => {
    await Tool.find(callback)
}
/**
 * delete a tool by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} tool_id the ID of a tool
 * @param {function} callback  the call back function
 */
exports.deleteTool = async (tool_id, callback) => {
    Tool.deleteOne({_id: tool_id}, function(err, result){
        if(err || !result.deletedCount ) {
            callback(err, result)
        } else {
            callback(undefined, "Successfully delete the tool")
        }
    })
}
/**
 * updates a tool by its ID
 * Callback:
 * - err, error in database
 * - result, the result of this action
 * @param {ObjectID} toolBody  the properties that need to be updated
 * @param {function} callback  the call back function
 */
exports.updateTool = async (toolBody, callback) => {
    const toolId = toolBody._id
    delete toolBody["_id"]
    const updates = Object.keys(toolBody)
    const allowedUpdates = ['name', 'description', "articles", "comments"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return callback("Invalid Update", undefined)
    }


    try {
        let tool = await Tool.findOne({ _id: toolId})

        if (!tool) {
            return callback("Invalid Update: Unable to find the tool", undefined)
        }

        updates.forEach((update) => tool[update] = toolBody[update])
        await tool.save()
        return callback(undefined, tool)
    } catch (e) {
        return callback("Invalid Update"+e, undefined)
    }
}

