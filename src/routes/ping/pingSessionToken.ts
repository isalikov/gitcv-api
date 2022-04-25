import { Response } from 'express';
import { AuthorizedRequest } from '../../types/server';

const pingSessionToken = (req: AuthorizedRequest, res: Response) => {
    res.json({ user: req.user, gh: req.githubToken });
};

export default pingSessionToken;
