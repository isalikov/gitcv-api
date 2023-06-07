import httpStatus from 'http-status'

import { UserController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse } from '../types'

const getCurrentUser = async (req: AppRequest, res: AppResponse) => {
    try {
        const userController = new UserController(res.locals)

        let user = await userController.getUser()

        if (!user) {
            await userController.create()
        }

        user = await userController.getUser()

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

export default getCurrentUser
