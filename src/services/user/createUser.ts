import { ContactItem, User } from '../../types';
import { getGithubUser } from '../github';
import { UserModel } from '../../models';
// import { toResult } from '../../utils';

const createUser = async (githubToken: string): Promise<User> => {
    const githubUser = await getGithubUser(githubToken);
    // const githubRepos = await getGithubRepos(githubToken, githubUser.login);

    const contacts: ContactItem[] = githubUser.email
        ? [
              {
                  title: githubUser.email,
                  url: `mailto:${githubUser.email}`,
              },
          ]
        : [];

    const user = new UserModel<User>({
        name: githubUser.name,
        hireable: githubUser.hireable,

        github_avatar_url: githubUser.avatar_url,
        github_id: githubUser.id,
        github_login: githubUser.login,
        github_url: githubUser.url,
        github_node_id: githubUser.node_id,
        github_public_repos: githubUser.public_repos,

        skills: [],

        contacts,
    });

    // const doc = await user.save();
    //
    // return toResult<User>(doc);

    return user;
};

export default createUser;
