import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { CVEntity } from './CVEntity'
import { RepoEntity } from './RepoEntity'
import { Language } from '../types'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'json', default: [] })
    languages: Language[]

    @Column({ unique: true })
    githubID: number

    @Column({ unique: true })
    githubLogin: string

    @Column({ nullable: true })
    about?: string

    @Column({ nullable: true })
    name?: string

    @Column({ nullable: true })
    photo?: string

    @Column({ nullable: true })
    position?: string

    @OneToMany(() => RepoEntity, ({ user }) => user)
    repos: RepoEntity[]

    @OneToMany(() => CVEntity, ({ user }) => user)
    cvs: CVEntity[]
}
