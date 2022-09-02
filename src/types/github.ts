import { Endpoints } from '@octokit/types';

export type GithubRepo =
    Endpoints['GET /repos/{owner}/{repo}']['response']['data'];

export type GithubRepos = Endpoints['GET /user/repos']['response']['data'];
export type GithubUser = Endpoints['GET /user']['response']['data'];
