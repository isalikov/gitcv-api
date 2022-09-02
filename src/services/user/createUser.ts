import { getUser } from '../github';
import { UserModel } from '../../models';
import { User } from '../../types/models';
import { toResult } from '../../utils';

const createUser = async (githubToken: string): Promise<User> => {
    const githubUser = await getUser(githubToken);
    console.log(githubUser);

    const user = new UserModel<User>({
        email: githubUser.email,
        login: githubUser.login,
        name: githubUser.name,
        photo: githubUser.avatar_url,
        profile: [],
    });

    const doc = await user.save();

    return toResult<User>(doc);
};

export default createUser;
