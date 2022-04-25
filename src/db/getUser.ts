import { IUser } from '../interfaces/user';

const getUser = async (id: string): Promise<IUser | null> => {
    return {
        id: parseInt(id),
    };
};
export default getUser;
