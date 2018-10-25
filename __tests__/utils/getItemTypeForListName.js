import { getItemTypeForListName } from '../client/lib/utils';

test('Correct ItemType', () => {
    //No spaces
    expect(getItemTypeForListName('test')).toBe("SP.Data.TestListItem");

    //Spaces
    expect(getItemTypeForListName('some weird name')).toBe("SP.Data.Some_x0020_weird_x0020_nameListItem");
});