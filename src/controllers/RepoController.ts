import { Repository } from 'typeorm'

import { OctokitController } from './OctokitController'
import dataSource from '../data-source'
import { RepoEntity, UserEntity } from '../entities'
import { GithubRepo, Repo, Locals } from '../types'
import { unixTimestamp } from '../utils'

export class RepoController {
    private repository: Repository<RepoEntity>
    private octokitController: OctokitController

    constructor(locals: Locals) {
        this.repository = dataSource.getRepository(RepoEntity)
        this.octokitController = new OctokitController(locals.githubToken)
    }

    private async fill(repo: GithubRepo): Promise<Repo> {
        const languages = await this.octokitController.getGithubRepoLanguages(repo)
        const readme = await this.octokitController.getGithubRepoReadme(repo)

        const timestamp = unixTimestamp()

        return {
            id: repo.id,
            title: repo.name,
            about: repo.description,
            readme,
            stack: Object.keys(languages).map((title) => ({
                title,
                involvement: languages[title],
            })),
            createdAt: timestamp,
            updatedAt: timestamp,
        }
    }

    private async getRepos(): Promise<Repo[]> {
        const user = await this.octokitController.getGithubUser()
        const repos = await this.octokitController.getGithubRepos(user.public_repos)

        return Promise.all(repos.map(async (repo) => this.fill(repo)))
    }

    public async sync(user: UserEntity): Promise<void> {
        await this.repository.delete({ user })
        const repos = await this.getRepos()

        for (const repo of repos) {
            await this.repository.insert({
                ...repo,
                user,
            })
        }
    }
}
