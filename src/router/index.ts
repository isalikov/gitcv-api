import Router from '@koa/router';

import { authorizeBySessionToken } from '../middlewares';

import { getAuthorizedUser } from './user';

const router = new Router();

router.get('/', authorizeBySessionToken, getAuthorizedUser);

export default router;
