import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL
});

client
    .on('error', (err) => console.error('Redis Client:: Error', err));

client
    .on('connect', () => console.log('Redis Client: Connected'));

export default client
