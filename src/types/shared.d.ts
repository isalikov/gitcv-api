export type GithubResponse<T> = { data: T }

export type PagedQuery = {
    per_page: number
    page: number
}

export type UniqueArray<T extends Record<string, unknown>> = Array<T & { uuid: string }>

export type Timestamps = 'createdAt' | 'updatedAt'
