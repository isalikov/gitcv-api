import { Repository } from 'typeorm'

import { OctokitController } from './OctokitController'
import { RepoController } from './RepoController'
import dataSource from '../data-source'
import { UserEntity } from '../entities'
import { User, Locals } from '../types'
import { unixTimestamp } from '../utils'

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
            where: { id: this.githubID },
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
        const { login, name, avatar_url, bio } = await this.octokitController.getGithubUser()

        const timestamp = unixTimestamp()

        await this.repository.insert({
            login,
            name,
            id: this.githubID,
            photo: avatar_url,
            position: bio,
            createdAt: timestamp,
            updatedAt: timestamp,
        })

        const user = await this.repository.findOne({
            where: { id: this.githubID },
        })

        await this.repositoryController.sync(user)
    }

    public async sync(): Promise<User> {
        const { login, name, avatar_url, bio } = await this.octokitController.getGithubUser()

        const timestamp = unixTimestamp()

        await this.repository.update(
            { id: this.githubID },
            {
                login,
                name,
                id: this.githubID,
                photo: avatar_url,
                position: bio,
                updatedAt: timestamp,
            },
        )

        const user = await this.repository.findOne({
            where: { id: this.githubID },
        })

        await this.repositoryController.sync(user)

        return this.getUser()
    }
}
