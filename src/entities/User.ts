import { Entity as EntityDecorator, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import Entity from './Entity'
import Repo from './Repo'
import { Language } from '../types'

@EntityDecorator()
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'json', default: [] })
    languages: Language[]

    @Column()
    githubID: number

    @Column()
    githubLogin: string

    @Column({ nullable: true })
    about?: string

    @Column({ nullable: true })
    name?: string

    @Column({ nullable: true })
    photo?: string

    @Column({ nullable: true })
    position?: string

    @OneToMany(() => Entity, (entity) => entity.user)
    entities: Entity[]

    @OneToMany(() => Repo, (repo) => repo.user)
    repos: Repo[]
}
