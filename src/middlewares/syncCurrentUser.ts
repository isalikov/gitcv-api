import httpStatus from 'http-status'

import { UserController } from '../controllers'
import { AppRequest, AppResponse } from '../types'

const syncCurrentUser = async (req: AppRequest, res: AppResponse) => {
    const userController = new UserController(res.locals)

    try {
        const user = await userController.sync()

        res.json(user)
    } catch (e) {
        // TODO: handle error
        console.error(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export default syncCurrentUser
