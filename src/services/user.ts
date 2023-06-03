import { Octokit } from '@octokit/core'

import { defaultProjection, defaultSettings } from '../constants'
import { UserModel } from '../mongoose'
import { GithubUserResponse, Locals, User } from '../types'

export const createUser = async (locals: Locals): Promise<void> => {
    const octokit = new Octokit({ auth: locals.githubToken })
    const { data } = (await octokit.request('GET /user')) as GithubUserResponse

    const user = new UserModel({
        CVs: [],
        name: data.name,
        photo: data.avatar_url,
        projects: [],
        settings: defaultSettings,
        spokenSkills: [],
        uuid: locals.githubID,
    })

    await user.save()
}

export const getUserByUUID = async (locals: Locals): Promise<User> => {
    const user = await UserModel.findOne({ uuid: locals.githubID }, `${defaultProjection} -settings._id`)

    if (!user) {
        await createUser(locals)
        return getUserByUUID(locals)
    }

    return user
}
