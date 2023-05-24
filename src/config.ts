export default {
    port: process.env.PORT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    isDevelop: process.env.NODE_ENV === 'production',
}
