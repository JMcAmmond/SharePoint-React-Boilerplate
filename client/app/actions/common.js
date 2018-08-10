import Api from '../lib/api';
import * as types from './types';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

/**
 * Common function to attach a file to a list item
 * @param {String} listName 
 * @param {Object} newFile
 * @param {Number} itemId 
 */
export function attachFile(listName, newFile, itemId) {
	return Api.postFile(`
        ${APP_CONFIG.site.url}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/add(FileName='${newFile.filename}')`,
		newFile.data,
		newFile.size
	).then(function (resp) {
		return resp;
	}).catch(function (ex) {
		return ex;
	})
}

/**
 * Common function to delete a file attachment from a list item
 * @param {String} listName 
 * @param {String} fileName
 * @param {Number} itemId 
 */
export function deleteAttachment(listName, fileName, itemId) {
	return Api.delete(`
        ${APP_CONFIG.site.url}/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/getByFileName('${fileName}')`
	).then(function (resp) {
		return resp;
	}).catch(function (ex) {
		return ex;
	})
}