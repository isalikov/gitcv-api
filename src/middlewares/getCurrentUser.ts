import UserController from '../controllers/UserController'
import { AppRequest, AppResponse } from '../types'

const getCurrentUser = async (req: AppRequest, res: AppResponse) => {
    const userController = new UserController(res.locals)

    let user = await userController.getUser()

    if (!user) {
        await userController.create()
    }

    user = await userController.getUser()

    res.json(user)
}

export default getCurrentUser
