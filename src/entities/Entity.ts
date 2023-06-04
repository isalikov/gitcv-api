import { OutputData } from '@editorjs/editorjs'
import { Entity as EntityDecorator, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import User from './User'

@EntityDecorator()
export default class Entity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    position: string

    @Column()
    uuid: string

    @Column()
    githubID: number

    @Column()
    location?: string

    @Column()
    photo?: string

    @Column({ type: 'json' })
    about?: OutputData

    @Column({ type: 'json' })
    education?: OutputData

    @Column({ type: 'json' })
    history?: OutputData

    @ManyToOne(() => User, (user) => user.entities)
    user: User
}
