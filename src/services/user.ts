import { getGithubRepoLanguages, getGithubRepoReadme, getGithubRepos } from './github'
import { GithubRepo, GithubUser, Repo, Technology } from '../types'

const mapLanguagesToTechnologies = (languages: Record<string, number>): Technology[] =>
    Object.keys(languages).map((title) => ({
        title,
        involvement: languages[title],
    }))

const getRepo = async (repo: GithubRepo): Promise<Repo> => {
    const readme = await getGithubRepoReadme(repo)
    const languages = await getGithubRepoLanguages(repo.languages_url)

    return {
        about: repo.description,
        id: repo.id,
        name: repo.name,
        readme,
        technologies: mapLanguagesToTechnologies(languages),
    }
}

export const getUserRepos = async (auth: string, { public_repos }: GithubUser): Promise<Repo[]> => {
    const githubRepos = await getGithubRepos(auth, public_repos)

    return Promise.all(githubRepos.map(getRepo))
}
