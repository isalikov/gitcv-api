import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { UserEntity } from './UserEntity'

@Entity({ name: 'cvs' })
export class CVEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    position: string

    @Column({ unique: true })
    uuid: string

    @Column({ unique: true })
    cvtag: string

    @Column()
    githubID: number

    @Column({ nullable: true })
    location: string

    @Column({ nullable: true })
    photo: string

    @Column({ nullable: true, type: 'text' })
    about: string

    @Column({ nullable: true, type: 'text' })
    education: string

    @Column({ nullable: true, type: 'text' })
    history: string

    @ManyToOne(() => UserEntity, (user) => user)
    user: UserEntity
}
