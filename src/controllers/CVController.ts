import { Repository } from 'typeorm'

import { v4 as uuidV4 } from 'uuid'

import { OpenAIController } from './OpenAIController'
import { UserController } from './UserController'
import dataSource from '../data-source'
import { CVEntity } from '../entities'
import { Cv, Locals } from '../types'

export class CVController {
    private repository: Repository<CVEntity>
    private openAIController: OpenAIController
    private userController: UserController

    constructor(locals: Locals) {
        this.repository = dataSource.getRepository(CVEntity)
        this.openAIController = new OpenAIController()
        this.userController = new UserController(locals)
    }

    public async getEntity(uuid: string): Promise<Cv | null> {
        return this.repository.findOne({ where: { uuid } })
    }

    public async create(repos: number[]): Promise<Cv> {
        const user = await this.userController.getUser()
        const about = await this.openAIController.getAboutText(user, repos)

        const uuid = uuidV4()

        await this.repository.insert({
            about,
            user,
            uuid,
            name: user.name,
            position: user.position,
            githubID: user.githubID,
            photo: user.photo,
        })

        return this.getEntity(uuid)
    }
}
