import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm'

import { UserEntity } from './UserEntity'

import { Technology } from '../types'

@Entity({ name: 'repositories' })
export class RepoEntity {
    @PrimaryColumn()
    id: number

    @Column({ type: 'json', default: [] })
    stack: Technology[]

    @Column()
    title: string

    @Column({ nullable: true })
    about: string

    @Column({ nullable: true })
    readme: string

    @ManyToOne(() => UserEntity, (user) => user.repos)
    user: UserEntity

    @Column()
    createdAt: number

    @Column()
    updatedAt: number
}
