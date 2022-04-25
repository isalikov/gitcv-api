import { Router } from 'express';

import pingSessionToken from './pingSessionToken';

const routes = Router();

routes.get('/', pingSessionToken);

export default routes;
