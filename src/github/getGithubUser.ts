import { Octokit } from '@octokit/core';

const getGithubUser = async (auth: string) => {
    console.log(auth);

    const octokit = new Octokit({ auth });
    const { data } = await octokit.request('GET /user');

    return data;
};

export default getGithubUser;
