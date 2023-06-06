import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from './UserEntity'
import { DatePoint } from '../types'

@Entity({ name: 'employers' })
export class EmployerEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    position: string

    @Column({ nullable: true })
    description: string

    @Column({ type: 'json', nullable: true })
    from: DatePoint

    @Column({ type: 'json', nullable: true })
    to: DatePoint

    @Column({ nullable: true })
    location: string

    @Column({ nullable: true })
    website: string

    @ManyToOne(() => UserEntity, (user) => user.repos)
    user: UserEntity
}
