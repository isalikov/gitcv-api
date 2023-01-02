import { getUser } from '../github';
import { UserModel } from '../../models';
import { User } from '../../types/models';
import { toResult } from '../../utils';

const createUser = async (githubToken: string): Promise<User> => {
    const githubUser = await getUser(githubToken);

    const user = new UserModel<User>({
        githubID: githubUser.id,
        login: githubUser.login,
        photo: githubUser.avatar_url,
    });

    const doc = await user.save();

    return toResult<User>(doc);
};

export default createUser;
