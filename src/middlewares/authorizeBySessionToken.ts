import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import redis from '../services/redis';
import { AuthorizedRequest } from '../types/server';

import { createUserWithGithubToken, getUserByGithubID } from '../contracts';

const authorizeBySessionToken = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const { session_token } = req.headers;

    if (!session_token) {
        res.status(httpStatus.UNAUTHORIZED).send(httpStatus['UNAUTHORIZED']);

        return;
    }

    const session = await redis.hGetAll(session_token as string);

    if (!session) {
        res.status(httpStatus.UNAUTHORIZED).send(httpStatus['UNAUTHORIZED']);

        return;
    }

    const [id] = Object.keys(session);
    const [githubToken] = Object.values(session);

    if (!id || !githubToken) {
        res.status(httpStatus.UNAUTHORIZED).send(httpStatus['UNAUTHORIZED']);

        return;
    }

    req.githubToken = githubToken;
    const existUser = await getUserByGithubID(id);

    if (existUser) {
        console.log(existUser);
        req.user = existUser;
    } else {
        req.user = await createUserWithGithubToken(githubToken);
    }

    next();
};

export default authorizeBySessionToken;
