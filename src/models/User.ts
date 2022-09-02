import { Schema, model, Model } from 'mongoose';

import { Profile, User } from '../types/models';
import { MongooseTimestamp } from '../types/helpers';

type MongooseUser = User & MongooseTimestamp;
type MongooseProfile = Profile & MongooseTimestamp;

const profileSchema = new Schema<MongooseProfile, Model<MongooseProfile>>(
    {
        time: { type: String, required: true },
        blocks: [Schema.Types.Mixed],
    },
    { timestamps: true },
);

export default model<MongooseUser, Model<MongooseUser>>(
    'User',
    new Schema<MongooseUser, Model<MongooseUser>>(
        {
            email: { type: String },
            login: { type: String, required: true },
            name: { type: String, required: true },
            photo: { type: String, required: true },
            profile: [profileSchema],
        },
        { timestamps: true },
    ),
);
