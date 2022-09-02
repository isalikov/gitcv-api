import { Octokit } from '@octokit/core';

const getUser = async (auth: string) => {
    const octokit = new Octokit({ auth });
    const { data } = await octokit.request('GET /user');

    return data;
};

export default getUser;
