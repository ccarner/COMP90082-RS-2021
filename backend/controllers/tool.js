const Tool = require('../proxies/tool')

exports.NewAndSave = (req, res) => {
    if(!req.user._moderator){
        res.json({ success: false, error : "Only moderator can add a new tool" })
    } else {
        let tool = req.body
        Tool.newAndSave(tool, (err, result) => {
            if(err){
                console.log(err)
                res.json({ success: false, error: 'failed to save the tool' })
            } else {
                res.json({ success: true, tool: result })
            }
        })
    }
}

exports.deleteTool = (req,res) => {
    if(!req.user._moderator){
        res.json({ success: false, error : "Only moderator can add a new tool" })
    } else {
        Tool.deleteTool(req.body._id, (err, result) => {
            if(err){
                console.log(err)
                res.json({ success: false, error: 'failed to delete a tool' })
            } else {
                res.json({ success: true, tool: result })
            }
        })
    }
}

exports.updateTool = (req,res) => {
    if(!req.user._moderator){
        res.json({ success: false, error : "Only moderator can update a tool" })
    } else {
        Tool.updateTool(req.body, (err, result) => {
            if(err){
                console.log(err+" this is an error")
                res.json({ success: false, error: 'Failed to update a tool' })
            } else {
                res.json({ success: true, tool: result })
            }
        })
    }
}

exports.getToolById = (req,res) => {
    Tool.getToolById(req.body._id, (err, result) => {
        if(err){
            console.log(err)
            res.json({ success: false, error: 'Failed to get the tool' })
        } else {
            res.json({ success: true, tool: result })
        }
    })
}

exports.getToolByName = (req, res) => {
    let tool_name = req.params.name || req.body.name
    Tool.getToolsByName(tool_name, (err, result) => {
        if(err){
            console.log(err)
            res.json({ success: false, error: 'Failed to get the tool' })
        } else {
            res.json({ success: true, tool: result })
        }
    })
}

exports.getAllTools = (req,res) => {
    Tool.getAllTools((err,result) => {
        if(err){
            res.json({ success: false, error: 'Failed to get all tools' })
        } else {
            res.json({ success: true, tool: result })
        }
    })
}