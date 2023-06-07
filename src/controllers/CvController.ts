import { Repository } from 'typeorm'

import { OpenAIController } from './OpenAIController'
import { UserController } from './UserController'
import dataSource from '../data-source'
import { CvEntity } from '../entities'
import { Cv, Education, Employer, Language, Locals, Project, Skill, UpdateCvBody, UpdateCvTagBody } from '../types'
import { getTag, getUniqueItems, unixTimestamp } from '../utils'

export class CvController {
    private repository: Repository<CvEntity>
    private openAIController: OpenAIController
    private userController: UserController

    constructor(locals: Locals) {
        this.repository = dataSource.getRepository(CvEntity)
        this.openAIController = new OpenAIController()
        this.userController = new UserController(locals)
    }

    public async getByTag(tag: string): Promise<Cv | null> {
        return this.repository.findOne({ where: { tag } })
    }

    public async create(title: string, repos: number[]): Promise<Cv> {
        const user = await this.userController.getUser()
        const profile = await this.openAIController.getProfileText(user, repos)

        const tag = getTag(user.login)
        const timestamp = unixTimestamp()

        await this.repository.insert({
            tag,
            title,
            profile,
            user,
            name: user.name,
            position: user.position,
            photo: user.photo,
            createdAt: timestamp,
            updatedAt: timestamp,
        })

        return this.getByTag(tag)
    }

    public async update(tag: string, body: Partial<UpdateCvBody>): Promise<Cv> {
        const timestamp = unixTimestamp()

        const education = getUniqueItems<Education>(body.education)
        const employers = getUniqueItems<Employer>(body.employers)
        const languages = getUniqueItems<Language>(body.languages)
        const projects = getUniqueItems<Project>(body.projects)
        const skills = getUniqueItems<Skill>(body.skills)

        await this.repository.update(
            { tag },
            {
                ...body,
                education,
                employers,
                languages,
                projects,
                skills,
                updatedAt: timestamp,
            },
        )

        return this.getByTag(tag)
    }

    public async updateTag(tag, { value }: UpdateCvTagBody): Promise<Cv | null> {
        await this.repository.update({ tag }, { tag: value })

        return this.getByTag(value)
    }
}
