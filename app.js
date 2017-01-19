var utility = require("./libs/utility");
var hashfiles = require("./libs/hashfiles");
var progress = {};
function getDuplicateds(path,callback){    
    var filepathes = utility.getFiles(path);
    progress.count = 0;
    progress.working = true;
    progress.total = filepathes.length;
    hashfiles.hashAndCategorize(filepathes,progress,{},function(hashes){
        utility.finalizeResult(hashes,function(result){
            progress.working = false;
            callback(result);            
        });
    });
}
function getProgress(callback){
    callback(progress);
}
exports.getDuplicateds = getDuplicateds; //get final result with one function
exports.getProgress = getProgress; //get progress (count will start from 0)