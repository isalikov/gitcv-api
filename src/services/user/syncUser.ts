import createUser from './createUser'
import getUserByUUID from './getUserByUUID'
import { UserModel } from '../../mongoose'
import { Locals, User } from '../../types'
import { getOctoProjects, getOctoUser } from '../octokit'

const syncUser = async (locals: Locals): Promise<User> => {
    const user = await UserModel.findOne({ uuid: locals.githubID })

    if (!user) {
        await createUser(locals)
    } else {
        const { name, avatar_url, public_repos } = await getOctoUser(locals.githubToken)
        const projects = await getOctoProjects(locals.githubToken, public_repos)

        await UserModel.findOneAndUpdate(
            { uuid: locals.githubID },
            {
                name,
                photo: avatar_url,
                projects,
            },
        )
    }

    return getUserByUUID(locals)
}

export default syncUser
