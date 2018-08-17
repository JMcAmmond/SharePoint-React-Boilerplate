/*****************************************************
*
*    DO NOT UPLOAD FILE WITH USERNAME AND PASSWORD
*    
*****************************************************/

let spsave = require("spsave").spsave;
let path = require('path');

/**
 * Upload files to SharePoint
 */
(function() {
    const projectFiles = './public/**.*'
    const spFolder = '';        // SiteAssets/Scripts/Test
    const coreOptions = {
        siteUrl: ''             // https://tenant.sharepoint.com/sites/site
    }
    const creds = {
        username: '',           // username@example.com
        password: ''            // Password12345
    }

    if (coreOptions.siteUrl === '' || creds.username === '' || creds.password === '' || spFolder === '') {
        console.log(' ');
        console.warn('\x1b[33m%s\x1b[0m', 'File not uploaded. Missing information');
        console.log(' ');
        return;
    }

    spsave(coreOptions, creds, {
        glob: projectFiles, 
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
