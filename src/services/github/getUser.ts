import { Octokit } from '@octokit/core';

const getUser = async (githubToken: string) => {
    const octokit = new Octokit({ auth: githubToken });
    const { data } = await octokit.request('GET /user');

    return data;
};

export default getUser;
