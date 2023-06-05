import { Repository } from 'typeorm'

import { OctokitController } from './OctokitController'
import { RepoController } from './RepoController'
import dataSource from '../data-source'
import { UserEntity } from '../entities'
import { User, Locals } from '../types'

export class UserController {
    private readonly githubID: number

    private repository: Repository<UserEntity>

    private octokitController: OctokitController
    private repositoryController: RepoController

    constructor(locals: Locals) {
        this.githubID = locals.githubID

        this.repository = dataSource.getRepository(UserEntity)

        this.octokitController = new OctokitController(locals.githubToken)
        this.repositoryController = new RepoController(locals)
    }

    public async getUser(): Promise<User> {
        const user = await this.repository.findOne({
            where: { githubID: this.githubID },
            relations: {
                cvs: true,
                repos: true,
            },
        })

        if (!user) {
            await this.create()
            return this.getUser()
        }

        return user
    }

    public async create(): Promise<void> {
        const githubUser = await this.octokitController.getGithubUser()

        await this.repository.insert({
            githubID: this.githubID,
            githubLogin: githubUser.login,
            name: githubUser.name,
            photo: githubUser.avatar_url,
            position: githubUser.bio,
        })

        const user = await this.repository.findOne({
            where: { githubID: this.githubID },
        })

        await this.repositoryController.sync(user)
    }

    public async sync(): Promise<User> {
        const githubUser = await this.octokitController.getGithubUser()

        await this.repository.update(
            { githubID: this.githubID },
            {
                githubID: this.githubID,
                githubLogin: githubUser.login,
                name: githubUser.name,
                photo: githubUser.avatar_url,
                position: githubUser.bio,
            },
        )

        const user = await this.repository.findOne({
            where: { githubID: this.githubID },
        })

        await this.repositoryController.sync(user)

        return this.getUser()
    }
}
