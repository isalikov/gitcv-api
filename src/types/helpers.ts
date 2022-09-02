import { ParameterizedContext } from 'koa';

export type AuthorizedContext = ParameterizedContext<{
    githubToken: string;
    githubID: string;
    userID: string;
}>;

export type MongooseTimestamp = {
    createdAt: string;
    updatedAt: string;
};

export type PagedQuery = {
    per_page: number;
    page: number;
};
