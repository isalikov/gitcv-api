import { Octokit } from '@octokit/core'

import axios from 'axios'
import qs from 'qs'

import { getPagedQuery } from './utils'
import config from '../config'
import { GithubRepo, GithubUser } from '../types'

export const getGithubRepoReadme = async ({ default_branch, name, owner }: GithubRepo): Promise<string> => {
    const url = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`
    const { data } = await axios.get<string>(url)

    return data as string
}

export const getGithubRepoLanguages = async (url: string): Promise<Record<string, number>> => {
    const { data } = await axios.get<Record<string, number>>(url, {
        headers: {
            Authorization: `Bearer ${config.GITHUB_TOKEN}`,
            'User-Agent': 'Gitcv IO',
        },
    })

    return data
}

export const getGithubRepos = async (auth: string, limit: number): Promise<GithubRepo[]> => {
    const octokit = new Octokit({ auth })
    const pagedQuery = getPagedQuery(limit, 100)

    let result = []

    for (const q of pagedQuery) {
        const url = `GET /user/repos?${qs.stringify({
            ...q,
            visibility: 'public',
        })}`

        const { data } = await octokit.request(url)

        result = [...result, ...data]
    }

    return result
}

export const getGithubUser = async (auth: string): Promise<GithubUser> => {
    const octokit = new Octokit({ auth })
    const response = await octokit.request('GET /user')

    return response.data as GithubUser
}
