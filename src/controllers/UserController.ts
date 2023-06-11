import { Repository } from 'typeorm'

import { OctokitController } from './OctokitController'
import { RepoController } from './RepoController'
import dataSource from '../data-source'
import { UserEntity } from '../entities'
import { User, Locals, UpdateUserBody, Skill, Project, Language, Repo, UniqueArray } from '../types'
import { getUniqueItems, unixTimestamp } from '../utils'

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

    public async getUserEntity(): Promise<UserEntity | null> {
        return this.repository.findOne({
            where: { id: this.githubID },
        })
    }

    public async getUser(): Promise<User | null> {
        return this.repository.findOne({
            where: { id: this.githubID },
            relations: {
                cvs: true,
                education: true,
                employers: true,
                repos: true,
            },
        })
    }

    private static getSkills = (repos: Repo[]): UniqueArray<Skill> => {
        const skills = repos.reduce<Skill[]>((result, repo) => {
            return [...result, ...repo.stack]
        }, [])

        const map = new Map([])
        for (const skill of skills) {
            const value = map.get(skill.title)

            if (value && typeof value === 'number') {
                map.set(skill.title, value + skill.involvement)
            } else {
                map.set(skill.title, skill.involvement)
            }
        }

        return getUniqueItems<Skill>(
            Array.from(map.keys()).reduce<Skill[]>((result, title: string) => {
                return [
                    ...result,
                    {
                        title,
                        involvement: map.get(title) as number,
                    },
                ]
            }, []),
        )
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

        const user = await this.getUserEntity()

        if (user) {
            await this.repositoryController.sync(user)
        }

        const { repos } = await this.getUser()
        await this.update({ skills: UserController.getSkills(repos) })
    }

    public async update(body: Partial<UpdateUserBody>): Promise<User> {
        const timestamp = unixTimestamp()

        const languages = getUniqueItems<Language>(body.languages)
        const projects = getUniqueItems<Project>(body.projects)
        const skills = getUniqueItems<Skill>(body.skills)

        await this.repository.update(
            { id: this.githubID },
            {
                ...body,
                languages,
                projects,
                skills,
                updatedAt: timestamp,
            },
        )

        return this.getUser()
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

        const user = await this.getUserEntity()
        if (user) {
            await this.repositoryController.sync(user)
        }

        const { repos } = await this.getUser()
        await this.update({ skills: UserController.getSkills(repos) })

        return this.getUser()
    }
}
