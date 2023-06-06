import { NextFunction, Request } from 'express'

import httpStatus from 'http-status'

import redis from '../connectors/redis'
import { AppHeaders, AppResponse } from '../types'

const authorize = async (req: Request, res: AppResponse, next: NextFunction) => {
    try {
        const { session } = req.headers as AppHeaders

        if (!session) {
            res.sendStatus(httpStatus.UNAUTHORIZED)

            return
        }

        const data = await redis.hGetAll(session as never)

        if (!data) {
            res.sendStatus(httpStatus.UNAUTHORIZED)

            return
        }

        const [githubID] = Object.keys(data)
        const githubToken = data[githubID]

        if (!githubID || !githubToken) {
            res.sendStatus(httpStatus.FORBIDDEN)

            return
        }

        res.locals = {
            githubID: parseInt(githubID, 10),
            githubToken,
        }

        next()
    } catch (e) {
        // TODO: handle error
        console.error(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export default authorize
