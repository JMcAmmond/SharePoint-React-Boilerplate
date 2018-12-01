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
 * Get the value that needs to be saved for a specific SharePoint column type
 * @param  {String} type
 * @param  {*} value
 * @return {*}
 */
export function getValueForType(type, value) {
    switch(type) {
        case("User"):
        	if(value === undefined || value === null) {
        		return null;
        	}
            return value.id;

        case("UserMulti"):
            var arr = [];
        
            for (let i=0; i<value.length; i++) {
                arr.push(value[i].id);
            }

            return {
            	"__metadata": {
            		"type": "Collection(Edm.Int32)"
            	},
            	"results": arr
            }

        case("DateTime"):
        	if(typeof value === 'string') {
        		let saveDate = new Date(value);
        			saveDate.setTime(saveDate.getTime() + (2*60*60*1000));
        		return saveDate.toISOString();
        	}
        	return null;

        case("Number"):
        	return parseInt(value);

        case("JSON"):
        	return JSON.stringify(value);

        case("YesNo"):
        	if(typeof value === 'string') {
	        	return value === "yes" ? true : false;
	        }
	        return value;

	    case("Choice"):
	    	return value;

	   	case("MultiLine"):
	   		return value;

        default:
            return value;
    }
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
 * Build a SharePoint REST api query from the provided schema
 * @param  {Object} schema
 * @return {String}
 */
export function buildSharePointQuery(schema) {
	let select = "";
	let expand = "";

	Object.keys(schema).forEach((key) => {
		if(schema[key].type === "User" || schema[key].type === "UserMulti") {
			select += `${select !== "" ? ', ' : ''}${key}/ID, ${key}/EMail, ${key}/Title`;
			expand += `${expand !== "" ? ', ' : ''}${key}`;
		}
		else if(schema[key].type === "Attachments") {
			select += `${select !== "" ? ', ' : ''}Attachments, AttachmentFiles`;
			expand += `${expand !== "" ? ', ' : ''}AttachmentFiles`;
		}
		else {
			select += `${select !== "" ? ', ' : ''}${key}`;
		} 
	});

	return `
		${select !== "" ? ('$select=' + select) : ''}
		${select !== "" && expand !== "" ? ('&$expand=' + expand) : ''}
	`;
}

/**
 * Check if the user has permissions for a select group
 * @returns {Promise.<T>|Promise|Promise<U>}
 */
export function hasPermissions(group) {
	return Api.get(`${APP_CONFIG.site.url}/_api/web/sitegroups/getByName('${group}')/Users?$filter=Id eq ${_spPageContextInfo.userId}`)
	.then(function(resp) {
		return resp.d.results.length > 0;
	}).catch(function(ex) {
		console.log(ex);
		throw ex;
	});
}