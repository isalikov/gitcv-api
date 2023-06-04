export default {
    isDevelop: process.env.NODE_ENV !== 'production',

    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    OPENAI_KEY: process.env.OPENAI_KEY,
    PORT: process.env.PORT,
    REDIS_URL: process.env.REDIS_URL,
    URL: process.env.URL,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '', 10),
    POSTGRES_USER: process.env.POSTGRES_USER,
}
