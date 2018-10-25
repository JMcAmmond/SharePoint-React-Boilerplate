import Api from './api';

/**
 * Scroll the page to the top when called
 */
export function scrollToTop() {
    if(detectIE()) {
        document.getElementById('s4-workspace').scrollTop = 0;
    } else {
        document.getElementById('s4-workspace').scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
export function detectIE() {
    let ua = window.navigator.userAgent;

    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        let rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

/**
 *
 */
export function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * Returns the item type of the list provided
 * @param {String} name 
 */
export function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("_x0020_").slice(1) + "ListItem";
}

/**
 * Returns the value of the provided key inside a query parameter
 * @param {String} name
 * @returns {string}
 */
export function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Get the current user information from the PeopleManager REST endpoint
 * @return {Promise}
 */
export function getCurrentUser() {
    let userObj;

    return Api.get(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`
    ).then(function(resp) {

        userObj = resp.d;
        return getUserId(resp.d.AccountName);

    }).then(function(resp) {

        return new Promise(function(resolve, reject) {
            userObj.UserId = resp.d.Id;
            resolve(userObj);
        });
    
    }).catch(function(ex) {
        return ex;
    });
}

/**
 * Get the id of a user based on the account name provided
 * @param  {String} accountName
 * @return {Promise}
 */
export function getUserId(accountName) {
    return Api.get(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/siteusers(@v)?@v='${encodeURIComponent(accountName)}'`
    ).then(function(resp) {
        return resp;
    }).catch(function(ex) {
        return ex;
    });
}

/**
 * Replace any line breaks with html page break
 * @param  {String} string 
 * @return {String}        
 */
export function replaceLineBreak(string) {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

/**
 * Formats a user into the proper react-select format
 * @param  {Object} user 
 * @return {Null || Object}
 */
export function formatSinglePeoplePickerObject(user) {
    if(user.EMail === undefined) {
        return null;
    }

    return {
        label: user.Title,
        value: user.EMail,
        id: user.ID
    }
}

/**
 * Formats multiple users into the proper react-select format
 * @param  {Array} users
 * @return {Array}
 */
export function formatMultiPeoplePickerObject(users) {
    let items = []

    if(users.results === undefined) {
        return items;
    }

    for(let i=0; i < users.results.length; i++) {
        items.push({
            label: users.results[i].Title,
            value: users.results[i].EMail,
            id: users.results[i].ID
        });
    }

    return items;
}

/**
 * Converts a string of numbers to a currency string (eg. 1,190.00)
 * @param  {String} value 
 * @return {String} 
 */
export function toCurrencyString(value, before) {
    return (before ? before : "") + value.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/**
 * Check if the user has permissions for a select group
 * @returns {Promise.<T>|Promise|Promise<U>}
 */
export function hasPermissions(group) {
    return Api.get(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/sitegroups/getByName('${group}')/Users?$filter=Id eq ${_spPageContextInfo.userId}`)
    .then(function(resp) {
        return resp.d.results.length > 0;
    }).catch(function(ex) {
        console.log(ex);
        throw ex;
    });
}

/**
 * Build a SharePoint REST api query from the provided schema
 * @param  {Object} schema
 * @return {String}
 *
 * Schema Example
 * ---------------
 *  {
 *      ID:             { type: "ID", key: "ID" },
 *      Title:          { type: "String", key: "Title" },
 *      Author:         { type: "User", key: "AuthorId" },
 *      Readers:        { type: "UserMulti", key: "ReadersId" },
 *      Attachments:    { type: "Attachments", key: "Attachments"},
 *  }
 *
 * Output
 * ---------------
 * $select=ID, Title, Author/ID, Author/EMail, Author/Title, Readers/ID, Readers/EMail, Readers/Title, Attachments, AttachmentFiles
 * &$expand=Author, Readers, AttachmentFiles
 * 
 */
export function buildSharePointQuery(schema) {
    let select = "";
    let expand = "";

    Object.keys(schema).forEach((key) => {
        switch(schema[key].type) {
            case("User"):
            case("UserMulti"):
                select += `${key}/ID, ${key}/EMail, ${key}/Title, `;
                expand += `${key}, `;
                break;
            case("Attachments"):
                select += `Attachments, AttachmentFiles, `;
                expand += `AttachmentFiles, `;
                break;
            default:
                select += `${key}, `;
        }
    });

    return `
        ${select !== "" 
            ? ('$select=' + select.slice(0, -2)) 
            : ''
        }
        ${select !== "" && expand !== "" 
            ? ('&$expand=' + expand.slice(0, -2)) 
            : ''
        }
    `.replace(/\s/g, "");
}