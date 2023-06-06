import httpStatus from 'http-status'

import { UserController } from '../controllers'
import { AppRequest, AppResponse, UpdateUserBody, User } from '../types'
import validate, { updateUserBodySchema } from '../validators'

const updateCurrentUser = async (req: AppRequest<UpdateUserBody>, res: AppResponse<User>) => {
    const userController = new UserController(res.locals)

    if (!validate(req, res, updateUserBodySchema)) {
        return
    }

    try {
        const user = await userController.update(req.body)

        res.json(user)
    } catch (e) {
        // TODO: handle error
        console.error(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export default updateCurrentUser
