import { DataSource } from 'typeorm'

import config from './config'
import Entity from './entities/Entity'
import Repo from './entities/Repo'
import User from './entities/User'

export const dataSource = new DataSource({
    type: 'postgres',
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    synchronize: true,
    logging: config.isDevelop,
    entities: [Entity, Repo, User],
    subscribers: [],
    migrations: [],
})

export default dataSource
