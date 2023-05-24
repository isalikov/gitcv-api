import './dotenv'

import bodyParser from 'body-parser'
import express from 'express'
import useragent from 'express-useragent'

import morgan from 'morgan'

import config from './config'
import routes from './routes'

import http from 'http'

const main = async () => {
    const app = express()

    app.use(bodyParser.json())
    app.use(useragent.express())
    app.use(morgan(config.isDevelop ? 'dev' : 'common'))
    app.use(routes)

    const server = http.createServer(app)
    server.listen(config.port)
}

main().catch(console.error)
