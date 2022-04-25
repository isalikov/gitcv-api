import { Router } from 'express';
import httpStatus from 'http-status';

import { authorizeBySessionToken } from '../middlewares';

import ping from './ping';

const routes = Router();

routes.use('/ping', authorizeBySessionToken, ping);

routes.use('*', (_, res) => {
    res.status(httpStatus.NOT_FOUND).send(httpStatus['NOT_FOUND']);
});

export default routes;
