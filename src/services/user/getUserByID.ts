import { User } from '../../types';
import { UserModel } from '../../models';
import { toResult } from '../../utils';

const getUserByID = async (github_id: string): Promise<User | null> => {
    const doc = await UserModel.findOne({ github_id });

    if (!doc) {
        return null;
    }

    return toResult<User>(doc);
};

export default getUserByID;
