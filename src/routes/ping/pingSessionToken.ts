import { Response } from 'express';
import { AuthorizedRequest } from '../../types/server';

const pingSessionToken = (req: AuthorizedRequest, res: Response) => {
    res.json(req.user);
};

export default pingSessionToken;
