import { AuthorizedContext } from '../../types';

const ping = (ctx: AuthorizedContext) => {
    ctx.body = ctx.state.user;
};

export default ping;
