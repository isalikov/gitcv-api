import { Schema, model } from 'mongoose';

import { IUser } from '../interfaces/user';

const User = model<IUser>(
    'User',
    new Schema<IUser>({
        github_id: { type: Number, required: true },
        login: { type: String, required: true },
        node_id: { type: String, required: true },
        avatar_url: { type: String, required: true },
        url: { type: String, required: true },
        repos_url: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        company: { type: String },
        location: { type: String, required: true },
        email: { type: String },
        hireable: { type: Boolean, required: true },
        bio: { type: String, required: true },
        public_repos: { type: Number, required: true },
        created_at: { type: String, required: true },
        updated_at: { type: String, required: true },
    }),
);

export default User;
