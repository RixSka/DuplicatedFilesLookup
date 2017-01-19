var fs = require('graceful-fs'); //needed instead of standard fs because of EMFILE error while managing an high amount of files
var path = require('path');

function getFiles (dir, files_){ //get files path recursvely and synchronously
    files_ = files_ || []; //create files array using paramater one or initializing an empty one 
        try{    
            var files = fs.readdirSync(dir); //read dir content synchronously
        
            for (var i in files){
                var name = path.join(dir,files[i]);
                if (fs.statSync(name).isDirectory()){ //if it's a folder, recurse function to get content
                    getFiles(name, files_);
                } else {
                    files_.push(name); //if it's a file push file path to array
                }
            }
      }
    catch(e){
        console.log(e);
    }
    return files_;
}

function finalizeResult(result, callback){ //finalize result by removing not duplicated files hash 
    var duplicateds = {};    
    duplicateds.hashes={};
    var filestotal = 0;
    for(var hash in result){ //select duplicated files and insert to duplicateds 
        if(result.hasOwnProperty(hash)){
            if(result[hash].length>1){
                duplicateds.hashes[hash]=result[hash];  
                filestotal += result[hash].length; //count total files processed 
            }
        }
    }      
    duplicateds.filestotal = filestotal; //add total files processed to final object
    duplicateds.duplicatedtotal=Object.keys(duplicateds.hashes).length; //add total duplicated files found 
    callback(duplicateds);
}

module.exports.getFiles = getFiles;
module.exports.finalizeResult = finalizeResult;