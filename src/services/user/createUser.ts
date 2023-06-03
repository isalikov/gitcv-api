import { defaultSettings } from '../../constants'
import { UserModel } from '../../mongoose'
import { Locals } from '../../types'
import { getOctoProjects, getOctoUser } from '../octokit'

const createUser = async (locals: Locals): Promise<void> => {
    const { name, login, avatar_url, public_repos } = await getOctoUser(locals.githubToken)
    const projects = await getOctoProjects(locals.githubToken, public_repos)

    const user = new UserModel({
        name: name || login,
        projects,
        CVs: [],
        photo: avatar_url,
        settings: defaultSettings,
        spokenSkills: [],
        uuid: locals.githubID,
    })

    await user.save()
}

export default createUser
