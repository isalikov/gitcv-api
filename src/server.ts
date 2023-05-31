import './dotenv'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import useragent from 'express-useragent'

import morgan from 'morgan'

import config from './config'
import mongodb from './connectors/mongodb'
import redis from './connectors/redis'
import routes from './routes'

import http from 'http'

const main = async () => {
    await redis.connect()
    await mongodb.connect(config.mongoURL)

    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use(useragent.express())
    app.use(morgan(config.isDevelop ? 'dev' : 'common'))
    app.use(routes)

    const server = http.createServer(app)
    server.listen(config.port)
}

main().catch(console.error)
