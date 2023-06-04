import { createClient } from 'redis'

import config from '../config'

const client = createClient({
    url: config.REDIS_URL,
})

client.on('error', (err) => console.error('Redis Client:: Error', err))

client.on('connect', () => console.log('Redis Client: Connected'))

export default client
