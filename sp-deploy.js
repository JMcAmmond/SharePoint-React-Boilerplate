/*****************************************************
*
*    DO NOT UPLOAD FILE WITH USERNAME AND PASSWORD
*    
*****************************************************/

let minimist = require('minimist');
let spsave = require("spsave").spsave;
let path = require('path');
let env = minimist(process.argv.slice(2)).env || null;
let spConfig = env === 'dist' 
    ? require('./sp-config.prod.js') 
    : require('./sp-config.dev.js');

/**
 * Upload files to SharePoint
 */
(function () {
    const spFolder = '';        // SiteAssets/Scripts/Test
    const creds = {
        username: '',           // username@example.com
        password: ''            // Password12345
    };

    if (spConfig.coreOptions.siteUrl === '' || creds.username === '' || creds.password === '' || spFolder === '') {
        console.log(' ');
        console.warn('\x1b[33m%s\x1b[0m', 'File not uploaded. Missing information');
        console.log(' ');
        return;
    }

    spsave(spConfig.coreOptions, creds, {
        glob: spConfig.projectFiles,
        folder: spFolder
    })
    .then(function () {
        console.log(' ');
        console.log('\x1b[35m%s\x1b[0m', 'Upload Finished');
        console.log(' ');
    })
    .catch(function (err) {
        console.log(err);
    });

}());
