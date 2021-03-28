const Section = require('../proxies/section')
const Tool = require('../proxies/tool')
const Subject = require('../proxies/subject')

exports.newAndSave = (req, res) => {
    if(!req.user._moderator){
        res.json({ success: false, error : "Only moderator can add a new section" })
    } else {
        Section.newAndSave(req.body, (err, section) => {
            if(err){
                console.log(err)
                res.json({ success: false, error: 'failed to save section' })
            } else {
                Subject.addSection(section.owner, section._id, (error, result) => {
                    if(error){
                        res.json({ success: false, error: 'failed to save section into the subject' + error })
                    } else {
                        return res.json({ success: true, section: section })
                    }
                })
            }
        })
    }
}


exports.deleteSection = (req,res) => {
    if(!req.user._moderator){
        res.json({ success: false, error : "Only moderator can add a new section" })
    } else {
        const section_id = req.body._id
        const subject_code = req.body.subject_code
        Section.deleteSection(req.body, (err, result) => {
            if(err || result.n === 0){
                res.json({ success: false, error: 'failed to delete section' })
            } else {
                return res.json({ success: true, result: result})
            }
        })

    }
}

exports.getSectionbySubjectCode = (req, res) => {
    Section.getSectionbySubjectCode(req.body.subject._id, (err, result) => {
        if(err){
            console.log(err)
            res.json({ success: false, error: 'failed to find the section' })
        } else {
            return res.json(result)
        }
    })
}