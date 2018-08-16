/*****************************************************
*
*    DO NOT UPLOAD FILE WITH USERNAME AND PASSWORD
*    
*****************************************************/

let spsave = require("spsave").spsave;
let fs = require('fs');
let path = require('path');

/**
 * Upload bundle.js to SharePoint
 */
(function() {
    const folder = '';          // SiteAssets/Scripts/CodeSplitting
    const coreOptions = {
        siteUrl: ''             // https://tenant.sharepoint.com/sites/site
    }
    const creds = {
        username: '',           // username@axample.com
        password: ''            // Password12345
    }
    let projectFiles = [];

    if(coreOptions.siteUrl === '' || creds.username === '' || creds.password === '' || folder === '') {
        console.log(' ');
        console.warn('\x1b[33m%s\x1b[0m', 'File not uploaded. Missing information');
        console.log(' ');
        return;
    }

    fs.readdirSync('./public/').forEach(file => {
        projectFiles.push({
            filePath: path.join(__dirname, `public/${file}`),
            coreOptions: coreOptions,
            creds: creds,
            fileOptions: {
                folder: folder,
                fileName: file
            }
        })
    });

    for(let i=0; i<projectFiles.length; i++) {
        uploadFile(
            projectFiles[i].filePath,
            projectFiles[i].coreOptions,
            projectFiles[i].creds,
            projectFiles[i].fileOptions
        );
    }

}());


function uploadFile(filePath, coreOptions, creds, fileOptions) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            fileOptions.fileContent = data;

            spsave(coreOptions, creds, fileOptions)
                .then(function () {
                    //Add empty line after script is uploaded
                    console.log(' ');
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else {
            console.log(err);
        }
    });
}