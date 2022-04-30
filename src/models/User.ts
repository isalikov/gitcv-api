import { Schema, model } from 'mongoose';

import { ContactItem, SkillItem, User, UserModelType } from '../types';

export const ContactItemSchema = new Schema<ContactItem>(
    {
        url: { type: String, required: true },
        title: { type: String, required: true },
    },
    { id: false, _id: false },
);

export const SkillItemSchema = new Schema<SkillItem>(
    {
        level: { type: Number, required: true },
        title: { type: String, required: true },
    },
    { id: false, _id: false },
);

export default model<User, UserModelType>(
    'User',
    new Schema<User, UserModelType>(
        {
            name: { type: String, required: true },
            hireable: { type: Boolean, required: true, default: false },

            github_avatar_url: { type: String, required: true, unique: true },
            github_id: { type: Number, required: true, unique: true },
            github_login: { type: String, required: true, unique: true },
            github_url: { type: String, required: true, unique: true },
            github_node_id: { type: String, required: true, unique: true },
            github_public_repos: { type: Number, required: true, unique: true },

            about: { type: String },
            avatar_url: { type: String },
            bio: { type: String },
            company: { type: String },
            email: { type: String },
            location: { type: String },

            contacts: [ContactItemSchema],
            skills: [SkillItemSchema],
        },
        { timestamps: true },
    ),
);
