# DuplicatedFilesLookup

NodeJS module to seek duplicated files on a selected path.

### USAGE
```bash
npm i duplicatedfileslookup --save
```
```javascript
var dfl = require("duplicatedfileslookup");
dfl.getDuplicateds(path,function(result){
    //do something with result object
});
```
Track progression:
```javascript
dfl.getProgress(function(progress){
    /*  do somenthing with progress object
    /*  { 
    /*    count : *last file processed*,
    /*    total : *totalfile to process*,
    /*    working : true|false
    /*  }
});
```
### LICENSE
- [DuplicatedFilesLookup](https://www.npmjs.com/package/duplicatedfileslookup) [(MIT)](https://github.com/RixSka/duplicatedfileslookup/blob/master/LICENSE)
- [graceful-fs](https://www.npmjs.com/package/graceful-fs) [(ISC)](https://spdx.org/licenses/ISC)

