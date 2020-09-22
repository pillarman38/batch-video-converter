const cp = require("child_process");
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const fs = require('fs');
const { electron } = require("process");


let routeFunctions = {
    getInfo: (info, callback) => {
        console.log(info);
        var arr = []
        var mapper = info.map(title => title.path)
var callbackArr = []
        for(var i = 0; i < mapper.length; i++) {
            if(fs.lstatSync(mapper[i]).isDirectory()) {
                var syncOrNo  = fs.readdirSync(mapper[i])
                remap = syncOrNo.map(title => arr.push(mapper[i].replace(new RegExp(/\\/, 'g'), '/') +'/'+ title))
            } else {
                console.log(mapper[i]);
                arr.push(mapper[i])
            }
            console.log(i, mapper.length);
            if(i == mapper.length - 1) {
                console.log("reached", arr);
                
                for(var x = 0; x < arr.length; x++) {
                    // console.log(x, arr.length);
                    ffmpeg.ffprobe(`${arr[x]}`, function(err, metaData) {
                        callbackArr.push(metaData)
                        if(callbackArr.length == arr.length) {
                            console.log("hi");
                            callback(callbackArr)
                        }
                    })
                    console.log(callbackArr.length , arr.length);
                    
                }
            }
        }
    },
     getDirectory: async (callback) => {
        
        const { dialog, app } = require('electron')

        const dialogOptions = {
            dontAddToRecent: true
        };
        try {
            const result = await dialog.showSaveDialog(dialogOptions);
            console.log('Save resolved:', result);
            const { filePath } = result
            console.log('filePath -->', filePath);
            var ret = filePath.replace(new RegExp(/\\/, 'g'), '/');
            callback(ret)
        } catch (e) {
            console.log('Save failed:', e)
        }
    }
}


module.exports = routeFunctions