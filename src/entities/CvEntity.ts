import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm'

import { UserEntity } from './UserEntity'
import { Education, Employer, Language, Project, Skill, UniqueArray } from '../types'

@Entity({ name: 'cvs' })
export class CvEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column({ unique: true })
    tag: string

    @Column()
    title: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ default: true })
    isVisible: boolean

    @Column({ type: 'json', default: [] })
    education: UniqueArray<Education>

    @Column({ type: 'json', default: [] })
    employers: UniqueArray<Employer>

    @Column({ type: 'json', default: [] })
    languages: UniqueArray<Language>

    @Column({ nullable: true })
    location: string

    @Column()
    name: string

    @Column()
    position: string

    @Column({ type: 'text' })
    profile: string

    @Column({ type: 'json', default: [] })
    projects: UniqueArray<Project>

    @Column({ type: 'json', default: [] })
    skills: UniqueArray<Skill>

    @Column({ nullable: true })
    photo: string

    @ManyToOne(() => UserEntity, (user) => user.cvs)
    user: UserEntity

    @Column()
    createdAt: number

    @Column()
    updatedAt: number
}
