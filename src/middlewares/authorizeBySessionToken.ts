import { Next } from 'koa';
import httpStatus from 'http-status';

import redis from '../services/redis';
import { AuthorizedContext } from '../types/helpers';

const authorizeBySessionToken = async (ctx: AuthorizedContext, next: Next) => {
    const { gitcv_session_id } = ctx.req.headers;

    if (!gitcv_session_id) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    const session = await redis.hGetAll(gitcv_session_id as string);

    if (!session) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    const [githubID] = Object.keys(session);
    const [githubToken] = Object.values(session);

    if (!githubID || !githubToken || !githubID) {
        return (ctx.status = httpStatus.UNAUTHORIZED);
    }

    ctx.state.githubToken = githubToken;
    ctx.state.githubID = parseInt(githubID, 10);

    await next();
};

export default authorizeBySessionToken;
