import httpStatus from 'http-status'

import { UserController } from '../controllers'
import { AppRequest, AppResponse } from '../types'

const getCurrentUser = async (req: AppRequest, res: AppResponse) => {
    try {
        const userController = new UserController(res.locals)

        let user = await userController.getUser()

        if (!user) {
            console.log(user)
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
        // TODO: handle error
        console.error(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export default getCurrentUser
