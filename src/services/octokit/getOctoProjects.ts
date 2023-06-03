import { Octokit } from '@octokit/core'
import axios from 'axios'
import qs from 'qs'

import config from '../../config'
import { GithubRepo, Project, ProjectLanguage } from '../../types'
import { getPagedQuery } from '../utils'

const getRepos = async (auth: string, limit: number): Promise<GithubRepo[]> => {
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

const mapLanguages = (languages: Record<string, number>): ProjectLanguage[] => {
    return Object.keys(languages).map((title) => ({
        title,
        involvement: languages[title],
    }))
}

const getReadme = async ({ default_branch, name, owner }: GithubRepo): Promise<string> => {
    const url = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`
    const { data } = await axios.get<string>(url)

    return data as string
}

const mapRepo = async (repo: GithubRepo): Promise<Project> => {
    const readme = await getReadme(repo)
    const { data } = await axios.get<Record<string, number>>(repo.languages_url, {
        headers: {
            Authorization: `Bearer ${config.githubToken}`,
            'User-Agent': 'Gitcv IO',
        },
    })

    return {
        readme,
        id: repo.id,
        about: repo.description,
        languages: mapLanguages(data),
        title: repo.name,
    }
}

const getOctoProjects = async (auth: string, limit: number): Promise<Project[]> => {
    const repos = await getRepos(auth, limit)

    return Promise.all(repos.map(mapRepo))
}

export default getOctoProjects
