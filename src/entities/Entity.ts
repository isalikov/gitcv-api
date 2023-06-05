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

    @Column({ nullable: true })
    location?: string

    @Column({ nullable: true })
    photo?: string

    @Column({ type: 'json', nullable: true })
    about?: OutputData

    @Column({ type: 'json', nullable: true })
    education?: OutputData

    @Column({ type: 'json', nullable: true })
    history?: OutputData

    @ManyToOne(() => User, (user) => user.entities)
    user: User
}
