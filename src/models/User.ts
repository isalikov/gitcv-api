import { Schema, model, Model } from 'mongoose';

import { User } from '../types/models';
import { MongooseTimestamp } from '../types/helpers';

type MongooseUser = User & MongooseTimestamp;

export default model<MongooseUser, Model<MongooseUser>>(
    'User',
    new Schema<MongooseUser, Model<MongooseUser>>(
        {
            login: { type: String, required: true },
            githubID: { type: Number, required: true },
            photo: { type: String, required: true },
        },
        { timestamps: true },
    ),
);
