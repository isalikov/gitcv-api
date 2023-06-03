import { GithubResponse } from '../shared'

export type GithubUser = {
    login: string
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    name: string
    blog: string
    bio: string
    created_at: string
    updated_at: string
    id: number
    site_admin: boolean
    company: string | null
    location: string | null
    email: string | null
    hireable: boolean
    twitter_username: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
}

export type GithubUserResponse = GithubResponse<GithubUser>
