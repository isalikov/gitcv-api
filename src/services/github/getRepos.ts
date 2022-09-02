import qs from 'qs';
import { Octokit } from '@octokit/core';
import { getPagedQuery } from '../../utils';
import { GithubRepos, GithubUser } from '../../types/github';

const getRepos = async (
    auth: string,
    user: GithubUser,
): Promise<GithubRepos> => {
    const octokit = new Octokit({ auth });
    const pagedQuery = getPagedQuery(user.public_repos, 100);

    let result: GithubRepos = [];

    for (const q of pagedQuery) {
        const url = `GET /user/repos?${qs.stringify({
            ...q,
            visibility: 'public',
        })}`;

        const { data } = await octokit.request(url);

        result = [...result, ...data];
    }

    return result;
};

export default getRepos;
