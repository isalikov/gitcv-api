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

    @Column({ nullable: true })
    about: string

    @Column({ nullable: true })
    education: string

    @Column({ nullable: true })
    history: string

    @ManyToOne(() => UserEntity, (user) => user)
    user: UserEntity
}
