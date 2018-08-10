/**
 * Returns the item type of the list provided
 * @param {String} name 
 */
export function GetItemTypeForListName(name) {
	return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}