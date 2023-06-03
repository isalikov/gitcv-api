export default {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    githubToken: process.env.GITHUB_TOKEN,
    isDevelop: process.env.NODE_ENV !== 'production',
    mongoURL: process.env.MONGO_URL,
    openAiKey: process.env.OPENAI_KEY,
    port: process.env.PORT,
    redisURL: process.env.REDIS_URL,
    url: process.env.URL,
}
