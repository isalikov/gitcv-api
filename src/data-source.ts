import { DataSource } from 'typeorm'

import config from './config'
import { CVEntity, RepoEntity, UserEntity } from './entities'

export const dataSource = new DataSource({
    type: 'postgres',
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    synchronize: true,
    logging: config.isDevelop,
    entities: [CVEntity, RepoEntity, UserEntity],
    subscribers: [],
    migrations: [],
})

export default dataSource
