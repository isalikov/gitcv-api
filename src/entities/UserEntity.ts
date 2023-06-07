import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'

import { CvEntity } from './CvEntity'
import { EducationEntity } from './EducationEntity'
import { EmployerEntity } from './EmployerEntity'
import { RepoEntity } from './RepoEntity'
import { Language, Project, Skill, UniqueArray } from '../types'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryColumn()
    id: number

    @Column()
    login: string

    @Column({ type: 'json', default: {} })
    contacts: Record<string, string>

    @Column({ type: 'json', default: [] })
    languages: UniqueArray<Language>

    @Column({ default: '' })
    name: string

    @Column()
    photo: string

    @Column({ type: 'text', default: '' })
    profile: string

    @Column({ type: 'json', default: [] })
    projects: UniqueArray<Project>

    @Column({ default: '' })
    position: string

    @Column({ type: 'json', default: [] })
    skills: UniqueArray<Skill>

    @OneToMany(() => EducationEntity, ({ user }) => user)
    education: EducationEntity[]

    @OneToMany(() => EmployerEntity, ({ user }) => user)
    employers: EmployerEntity[]

    @OneToMany(() => RepoEntity, ({ user }) => user)
    repos: RepoEntity[]

    @OneToMany(() => CvEntity, ({ user }) => user)
    cvs: CvEntity[]

    @Column()
    createdAt: number

    @Column()
    updatedAt: number
}
