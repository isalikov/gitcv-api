import { NextFunction, Request } from 'express'

import httpStatus from 'http-status'

import redis from '../connectors/redis'
import { AppHeaders, AppResponse } from '../types'

const Authorize = async (req: Request, res: AppResponse, next: NextFunction) => {
    const { session } = req.headers as AppHeaders

    if (!session) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }

    const data = await redis.hGetAll(session as never)

    if (!data) {
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }

    const [githubID] = Object.keys(data)
    const githubToken = data[githubID]

    if (!githubID || !githubToken) {
        return res.sendStatus(httpStatus.FORBIDDEN)
    }

    res.locals = {
        githubID,
        githubToken,
    }

    next()
}

export default Authorize
