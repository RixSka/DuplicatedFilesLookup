var crypto = require('crypto');
var fs = require('fs');
function encrypt(path,callback){ //get sha256 hash asynchronously
    
        var hash = crypto.createHash('sha256'), 
            stream = fs.createReadStream(path);

        stream.on('data', function (data) {
            hash.update(data, 'utf8');
        });

        stream.on('end', function () {            
            callback(hash.digest('hex')); 
        });
    
}
function hashAndCategorize(filepathes,progress,files_, callback){ //recursive function that will get files hashes and categorize them by hash
    var files = files_ || {}; 
    var count = progress.count || 0;  
    encrypt(filepathes[count],function(hash){ //encrypt file and categorize it                 
         if(typeof files[hash] == 'undefined') files[hash] = []; //create hash named property if doesn't exist
         files[hash].push(filepathes[count]); //push filepath to corresponding hash            
         if(typeof filepathes[count+1]=='undefined'){ 
             callback(files);
            } //if next file doesn't exist, callback result object then
         else{
             progress.count++;
              hashAndCategorize(filepathes,progress,files,callback);
            } //get next file hash
    }); 
}

//module.exports.progress = progress;
module.exports.hashAndCategorize = hashAndCategorize;
