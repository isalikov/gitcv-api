export type GithubResponse<T> = { data: T }

export type PagedQuery = {
    per_page: number
    page: number
}
