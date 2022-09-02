import { User } from '../../types/models';
import { UserModel } from '../../models';
import { toResult } from '../../utils';

const getUserByID = async (githubID: string): Promise<User | null> => {
    const doc = await UserModel.findOne({ githubID });

    if (!doc) {
        return null;
    }

    return toResult<User>(doc);
};

export default getUserByID;
