import createUser from './createUser'
import { UserModel } from '../../mongoose'
import { Locals, User } from '../../types'

const getUserByUUID = async (locals: Locals): Promise<User> => {
    const user = await UserModel.findOne(
        { uuid: locals.githubID },
        `-_id -__v -settings._id -projects._id -projects.languages._id`,
    )

    if (!user) {
        await createUser(locals)
        return getUserByUUID(locals)
    }

    return user
}

export default getUserByUUID
