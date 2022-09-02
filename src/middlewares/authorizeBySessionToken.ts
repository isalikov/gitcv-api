import { Next } from 'koa';
import httpStatus from 'http-status';

import redis from '../services/redis';
import { AuthorizedContext } from '../types/helpers';

const authorizeBySessionToken = async (ctx: AuthorizedContext, next: Next) => {
    const { session_token } = ctx.req.headers;

    if (!session_token) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    const session = await redis.hGetAll(session_token as string);

    if (!session) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    const [githubID] = Object.keys(session);
    const [githubToken] = Object.values(session);

    if (!githubID || !githubToken || !githubID) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    ctx.state.githubToken = githubToken;
    ctx.state.githubID = githubID;

    await next();
};

export default authorizeBySessionToken;
