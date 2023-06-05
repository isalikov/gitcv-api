import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { UserEntity } from './UserEntity'

import { Technology } from '../types'

@Entity({ name: 'repositories' })
export class RepoEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    githubID: number

    @Column({ type: 'json', default: [] })
    technologies: Technology[]

    @Column({ nullable: true })
    about?: string

    @Column({ nullable: true })
    readme?: string

    @ManyToOne(() => UserEntity, (user) => user.repos)
    user: UserEntity
}
