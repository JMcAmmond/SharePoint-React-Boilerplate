/**
 * Returns the item type of the list provided
 * @param {String} name 
 */
export function getItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("_x0020_").slice(1) + "ListItem";
}