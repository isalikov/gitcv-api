import { Octokit } from '@octokit/core';

const getGithubRepos = async (auth: string, username: string) => {
    const octokit = new Octokit({ auth });
    const { data } = await octokit.request(`GET /users/${username}/repos`);

    return data;
};

export default getGithubRepos;
