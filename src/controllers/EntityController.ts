import { OutputData } from '@editorjs/editorjs'
import { Repository } from 'typeorm'

import { v4 as uuidV4 } from 'uuid'

import UserController from './UserController'
import dataSource from '../data-source'
import Entity from '../entities/Entity'
import { generateCV } from '../services/openai'
import { Locals, Entity as EntityType } from '../types'

export default class EntityController {
    private readonly githubID: number
    private readonly githubToken: string

    private
    private userController: UserController
    private entityRepository: Repository<Entity>

    constructor(locals: Locals) {
        this.githubID = locals.githubID
        this.githubToken = locals.githubToken

        this.entityRepository = dataSource.getRepository(Entity)
        this.userController = new UserController(locals)
    }

    public async getEntity(uuid: string): Promise<EntityType | null> {
        const result = await this.entityRepository.findOne({ where: { uuid } })

        return {
            name: result.name,
            position: result.position,
            uuid: result.uuid,
            githubID: result.githubID,
            sections: {
                about: result.about,
                education: result.education,
                history: result.history,
            },
            location: result.location,
            photo: result.photo,
        }
    }

    public async create(repos: number[]): Promise<EntityType> {
        const user = await this.userController.getUser()
        const userEntity = await this.userController.getUserEntity()
        const text = await generateCV(user, repos)

        const uuid = uuidV4()

        const about: OutputData = {
            blocks: [
                {
                    data: { text },
                    type: 'paragraph',
                },
            ],
        }

        await this.entityRepository.insert({
            about,
            uuid,
            user: userEntity,
            name: user.name,
            position: user.position,
            githubID: user.githubID,
            photo: user.photo,
            education: { blocks: [] },
            history: { blocks: [] },
        })

        return this.getEntity(uuid)
    }
}
