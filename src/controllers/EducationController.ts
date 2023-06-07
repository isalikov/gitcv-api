import { Repository } from 'typeorm'

import { UserController } from './UserController'
import dataSource from '../data-source'
import { EducationEntity } from '../entities'
import { AccessError } from '../errors'
import { CreateEducationBody, Education, Locals, UpdateEducationBody } from '../types'

export class EducationController {
    private repository: Repository<EducationEntity>

    private userController: UserController

    protected readonly userID: number

    constructor(locals: Locals) {
        this.repository = dataSource.getRepository(EducationEntity)
        this.userController = new UserController(locals)

        this.userID = locals.githubID
    }

    private async hasAccess(id: number): Promise<void> {
        const item = await this.repository.findOne({ where: { id }, relations: { user: true } })

        if (item.user.id === this.userID) {
            throw new AccessError({
                id,
                name: 'education',
                githubID: this.userID,
            })
        }
    }

    public async getByID(id: number): Promise<Education> {
        await this.hasAccess(id)

        return this.repository.findOne({ where: { id }, relations: { user: true } })
    }

    public async create(body: CreateEducationBody): Promise<Education> {
        const user = await this.userController.getUserEntity()
        const result = await this.repository.insert({
            ...body,
            user,
        })

        const id = result.generatedMaps.at(0)?.id

        return await this.repository.findOne({ where: { id } })
    }

    public async delete(id: number): Promise<void> {
        await this.hasAccess(id)

        await this.repository.delete({ id })
    }

    public async update(id: number, body: UpdateEducationBody): Promise<Education> {
        await this.hasAccess(id)

        await this.repository.update({ id }, body)

        return await this.repository.findOne({ where: { id } })
    }
}
