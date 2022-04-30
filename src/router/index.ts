import Router from '@koa/router';

import { authorizeBySessionToken } from '../middlewares';

import ping from './ping';

const router = new Router();

router.get('/', authorizeBySessionToken, ping);

export default router;
