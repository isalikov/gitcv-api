import { UserController } from '../controllers'
import { AppRequest, AppResponse } from '../types'

const syncCurrentUser = async (req: AppRequest, res: AppResponse) => {
    const userController = new UserController(res.locals)
    const user = await userController.sync()

    res.json(user)
}

export default syncCurrentUser
