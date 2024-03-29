import httpStatus from 'http-status'

import { UserController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, UpdateUserBody, User } from '../types'
import validate, { updateUserBodySchema } from '../validators'

const updateCurrentUser = async (req: AppRequest<UpdateUserBody>, res: AppResponse<User>) => {
    const userController = new UserController(res.locals)

    if (!validate(req, res, updateUserBodySchema)) {
        return
    }

    try {
        const user = await userController.update(req.body)

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

export default updateCurrentUser
