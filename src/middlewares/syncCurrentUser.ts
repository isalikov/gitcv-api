import UserController from '../controllers/UserController'
import { AppRequest, AppResponse } from '../types'

const syncCurrentUser = async (req: AppRequest, res: AppResponse) => {
    const userController = new UserController(res.locals)

    await userController.sync()
    const user = await userController.getUser()

    res.json(user)
}

export default syncCurrentUser
