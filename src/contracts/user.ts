import { HydratedDocument } from 'mongoose';

import { User } from '../models';
import { IUser } from '../interfaces/user';
import { getGithubUser } from '../github';

export const getUserByGithubID = async (githubId: string): Promise<IUser | null> => {
    const result = await User.findOne({ githubId });

    if (!result) {
        return null;
    }

    return {
        github_id: result.github_id,
        login: result.login,
        node_id: result.node_id,
        avatar_url: result.avatar_url,
        url: result.url,
        repos_url: result.repos_url,
        type: result.type,
        name: result.name,
        company: result.company,
        location: result.location,
        email: result.email,
        hireable: result.hireable,
        bio: result.bio,
        public_repos: result.public_repos,
        created_at: result.created_at,
        updated_at: result.updated_at,
    };
};

export const createUserWithGithubToken = async (githubToken: string): Promise<IUser> => {
    const {
        id: github_id,
        login,
        node_id,
        avatar_url,
        url,
        repos_url,
        type,
        name,
        company,
        location,
        email,
        hireable,
        bio,
        public_repos,
        created_at,
        updated_at,
    } = await getGithubUser(githubToken);

    const user: HydratedDocument<IUser> = new User({
        github_id,
        login,
        node_id,
        avatar_url,
        url,
        repos_url,
        type,
        name,
        company,
        location,
        email,
        hireable,
        bio,
        public_repos,
        created_at,
        updated_at,
    });

    await user.save();

    return user;
};
