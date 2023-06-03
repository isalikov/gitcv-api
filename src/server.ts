import './dotenv'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import limiter from 'express-rate-limit'
import useragent from 'express-useragent'

import morgan from 'morgan'

import config from './config'
import mongodb from './connectors/mongodb'
import redis from './connectors/redis'
import { Authorize } from './middlewares'
import routes from './routes'

import http from 'http'

const main = async () => {
    await redis.connect()
    await mongodb.connect(config.mongoURL)

    const app = express()

    if (!config.isDevelop) {
        app.use(
            limiter({
                windowMs: 60 * 1000, // 1 min
                max: 30,
                standardHeaders: false,
                legacyHeaders: false,
            }),
        )
    }

    app.use(cors())
    app.use(morgan(config.isDevelop ? 'dev' : 'common'))
    app.use(Authorize)
    app.use(bodyParser.json())
    app.use(useragent.express())
    app.use(routes)

    const server = http.createServer(app)
    server.listen(config.port)
}

main().catch(console.error)
