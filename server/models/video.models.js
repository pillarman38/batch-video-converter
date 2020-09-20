const cp = require("child_process");
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

let routeFunctions = {
    getInfo: (info, callback) => {
        console.log(info);
        for(var i = 0; i < info.length; i++) {
           ffmpeg.ffprobe(`${info[i]['path']}`, function(err, metaData) {
            console.log(err, metaData);
        }) 
        }
        callback("", info)
    }
}


module.exports = routeFunctions