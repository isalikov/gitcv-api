import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from './UserEntity'
import { DatePoint } from '../types'

@Entity({ name: 'education' })
export class EducationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    faculty: string

    @Column()
    specialization: string

    @Column({ type: 'json', nullable: true })
    from: DatePoint

    @Column({ type: 'json', nullable: true })
    to: DatePoint

    @Column({ nullable: true })
    location: string

    @ManyToOne(() => UserEntity, (user) => user.education)
    user: UserEntity
}
