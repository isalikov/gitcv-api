import { getPagedQuery } from '../utils';

describe('getPagedQuery', () => {
    it('should be defined', () => {
        expect(getPagedQuery).toBeDefined();
    });

    it('should be per_page 99 for 1 page if limit 100', () => {
        const result = [
            {
                page: 1,
                per_page: 99,
            },
        ];

        expect(getPagedQuery(99, 100)).toEqual(result);
    });

    it('should be expected result', () => {
        const result = [
            {
                page: 1,
                per_page: 10,
            },
            {
                page: 2,
                per_page: 10,
            },
            {
                page: 3,
                per_page: 3,
            },
        ];

        expect(getPagedQuery(23, 10)).toEqual(result);
    });
});
