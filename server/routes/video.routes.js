let express = require('express')
let router = express.Router()
let models = require('../models/video.models')

router.post('/getinfo', (req, res)=>{
    models.getInfo(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})
// selectDirectory
router.get('/selectDirectory', (req, res)=>{
    models.getDirectory((err, results)=>{
        if(err){
            return res.send({err: err})
        } else {
            res.send(results)
        }
    })
})
module.exports = router