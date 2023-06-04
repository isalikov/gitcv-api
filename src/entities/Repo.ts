import { Entity as EntityDecorator, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import User from './User'

import { Technology } from '../types'

@EntityDecorator()
export default class Repo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'json' })
    technologies: Technology[]

    @Column({ nullable: true })
    about?: string

    @Column({ nullable: true })
    readme?: string

    @ManyToOne(() => User, (user) => user.repos)
    user: User
}
