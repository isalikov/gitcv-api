import httpStatus from 'http-status'

import { UserController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse } from '../types'

const syncCurrentUser = async (req: AppRequest, res: AppResponse) => {
    const userController = new UserController(res.locals)

    try {
        const user = await userController.sync()

        if (user) {
            res.json(user)
        } else {
            // TODO: handle if user from session not found
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        }
    } catch (e) {
        handleError(res, e)
    }
}

export default syncCurrentUser
