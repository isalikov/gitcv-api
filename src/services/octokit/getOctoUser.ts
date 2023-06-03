import { Octokit } from '@octokit/core'

import { GithubUser, GithubUserResponse } from '../../types'

const getOctoUser = async (auth: string): Promise<GithubUser> => {
    const octokit = new Octokit({ auth })
    const { data } = (await octokit.request('GET /user')) as GithubUserResponse

    return data
}

export default getOctoUser
