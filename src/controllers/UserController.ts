import { Repository } from 'typeorm'

import dataSource from '../data-source'
import RepoEntity from '../entities/Repo'
import UserEntity from '../entities/User'
import { getGithubUser } from '../services/github'
import { getUserRepos } from '../services/user'
import { Entity, GithubUser, Locals, User } from '../types'

export default class UserController {
    private readonly githubID: number
    private readonly githubToken: string

    private repoRepository: Repository<RepoEntity>
    private userRepository: Repository<UserEntity>

    constructor(locals: Locals) {
        this.githubID = locals.githubID
        this.githubToken = locals.githubToken

        this.repoRepository = dataSource.getRepository(RepoEntity)
        this.userRepository = dataSource.getRepository(UserEntity)
    }

    public async getUser(): Promise<User | null> {
        const result = await this.getUserEntity()

        if (result) {
            const entities = result.entities.map<Entity>((entity) => {
                return {
                    name: entity.name,
                    position: entity.position,
                    uuid: entity.uuid,
                    githubID: entity.githubID,
                    sections: {
                        about: entity.about,
                        education: entity.education,
                        history: entity.history,
                    },
                    location: entity.location,
                    photo: entity.photo,
                }
            })

            return {
                entities,
                about: result.about,
                githubID: this.githubID,
                githubLogin: result.githubLogin,
                languages: result.languages,
                name: result.name,
                photo: result.photo,
                position: result.photo,
                repos: result.repos,
            }
        }

        return null
    }

    public async getUserEntity(): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { githubID: this.githubID },
            relations: {
                entities: true,
                repos: true,
            },
        })
    }

    private async syncRepos(githubUser: GithubUser): Promise<void> {
        const userRepos = await getUserRepos(this.githubToken, githubUser)
        const user = await this.getUserEntity()

        await this.repoRepository.delete({ user })

        if (user) {
            for (const repo of userRepos) {
                await this.repoRepository.insert({
                    ...repo,
                    user,
                })
            }
        }
    }

    public async create(): Promise<void> {
        const githubUser = await getGithubUser(this.githubToken)
        const userRepos = await getUserRepos(this.githubToken, githubUser)

        const aboutRepo = userRepos.find((repo) => repo.name === githubUser.login)

        await this.userRepository.insert({
            githubID: this.githubID,
            about: aboutRepo?.readme,
            githubLogin: githubUser.login,
            name: githubUser.name,
            photo: githubUser.avatar_url,
            position: githubUser.bio,
        })

        await this.syncRepos(githubUser)
    }

    public async sync(): Promise<void> {
        const githubUser = await getGithubUser(this.githubToken)
        const userRepos = await getUserRepos(this.githubToken, githubUser)

        const aboutRepo = userRepos.find((repo) => repo.name === githubUser.login)

        await this.userRepository.update(
            { githubID: this.githubID },
            {
                githubID: this.githubID,
                about: aboutRepo?.readme,
                githubLogin: githubUser.login,
                name: githubUser.name,
                photo: githubUser.avatar_url,
                position: githubUser.bio,
            },
        )

        await this.syncRepos(githubUser)
    }
}
