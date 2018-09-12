import Api from '../lib/api';
import * as types from './types';

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

/**
 * Returns the item type of the list provided
 * @param {String} name 
 */
export function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("_x0020_").slice(1) + "ListItem";
}