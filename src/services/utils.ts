import { PagedQuery } from '../types'

export const getPagedQuery = (total: number, limit = 100): PagedQuery[] => {
    if (total < limit) {
        return [
            {
                page: 1,
                per_page: total,
            },
        ]
    }

    const length = Math.trunc(total / limit)

    const result = Array.from({ length }).map((_, index) => {
        return {
            page: index + 1,
            per_page: limit,
        }
    })

    return [...result, { page: result.length + 1, per_page: total - limit * length }]
}
