import { Next } from 'koa';
import httpStatus from 'http-status';

import redis from '../services/redis';
import { createUser, getUserByID } from '../services/user';
import { AuthorizedContext } from '../types';

const authorizeBySessionToken = async (ctx: AuthorizedContext, next: Next) => {
    const { session_token } = ctx.req.headers;

    if (!session_token) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    const session = await redis.hGetAll(session_token as string);

    if (!session) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    const [id] = Object.keys(session);
    const [githubToken] = Object.values(session);

    if (!id || !githubToken) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    ctx.state.githubToken = githubToken;
    const existUser = await getUserByID(id);

    if (existUser) {
        ctx.state.user = existUser;
    } else {
        ctx.state.user = await createUser(githubToken);
    }

    await next();
};

export default authorizeBySessionToken;
