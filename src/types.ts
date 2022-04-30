import { Model } from 'mongoose';
import { ParameterizedContext } from 'koa';

export type AuthorizedContext = ParameterizedContext<{
    githubToken: string;
    user: User;
}>;

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';

export type SkillItem = {
    level: number;
    title: string;
};

export type ContactItem = {
    title: string;
    url: string;
};

export interface User {
    name: string;
    hireable: boolean;

    github_avatar_url: string;
    github_id: number;
    github_login: string;
    github_url: string;
    github_node_id: string;
    github_public_repos: number;

    about?: string;
    avatar_url?: string;
    bio?: string;
    company?: string;
    email?: string;
    location?: string;

    contacts?: ContactItem[];
    skills?: SkillItem[];

    createdAt?: string;
    updatedAt?: string;
}

export type UserModelType = Model<User>;
