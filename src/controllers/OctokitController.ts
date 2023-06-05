import { Octokit } from '@octokit/core'

import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

import config from '../config'
import { GithubRepo, GithubUser, PagedQuery } from '../types'

export class OctokitController {
    private octokit: Octokit
    private apiRequest: AxiosInstance
    private rawRequest: AxiosInstance

    constructor(auth: string) {
        this.apiRequest = axios.create({
            headers: {
                Authorization: `Bearer ${config.GITHUB_TOKEN}`,
                'User-Agent': 'Gitcv IO',
            },
        })

        this.rawRequest = axios.create({
            baseURL: 'https://raw.githubusercontent.com',
        })

        this.octokit = new Octokit({ auth })
    }

    private getPagedQuery(total: number, limit = 100): PagedQuery[] {
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

    public async getGithubRepoLanguages(repo: GithubRepo): Promise<Record<string, number>> {
        const { data } = await this.apiRequest.get<Record<string, number>>(repo.languages_url)

        return data
    }

    public async getGithubRepoReadme({ default_branch, name, owner }: GithubRepo): Promise<string> {
        const { data } = await this.rawRequest.get<string>(`/${owner.login}/${name}/${default_branch}/README.md`)

        return data
    }

    public async getGithubRepos(count: number): Promise<GithubRepo[]> {
        const pagedQuery = this.getPagedQuery(count, 100)

        let result = []

        for (const q of pagedQuery) {
            const url = `GET /user/repos?${qs.stringify({
                ...q,
                visibility: 'public',
            })}`

            const { data } = await this.octokit.request(url)

            result = [...result, ...data]
        }

        return result
    }

    public async getGithubUser(): Promise<GithubUser> {
        const response = await this.octokit.request('GET /user')

        return response.data as GithubUser
    }
}
