import dotenv from 'dotenv-flow';
dotenv.config();

import Koa from 'koa';
import morgan from 'koa-morgan';
import cors from '@koa/cors';

import router from './router';
import mongodb from './services/mongodb';
import redis from './services/redis';

const app = new Koa();
const isDevelop = process.env.NODE_ENV !== 'production';

const main = async () => {
    await redis.connect();
    await mongodb.connect(process.env.MONGO_URL);

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // TODO: handle error with Sentry
            ctx.status = 500;
            ctx.body = {
                message: isDevelop ? err.message : 'Service Unavailable',
            };
        }
    });

    app.use(cors());
    app.use(morgan(isDevelop ? 'dev' : 'tiny'));
    app.use(router.routes());

    app.listen(process.env.PORT);
};

// TODO: handle error with Sentry
main().catch(console.error);
