import { sum } from '../client/app/actions/sum';

test('Sum calculations', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(3, 5)).not.toBe(12);
});