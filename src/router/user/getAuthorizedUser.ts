import { AuthorizedContext } from '../../types/helpers';
import { createUser, getUserByID } from '../../services/user';

const getAuthorizedUser = async (ctx: AuthorizedContext) => {
    const { githubToken, githubID } = ctx.state;

    let user = await getUserByID(githubID);

    if (!user) {
        user = await createUser(githubToken);
    }

    ctx.body = user;
};

export default getAuthorizedUser;
