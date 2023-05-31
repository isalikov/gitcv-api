import { Schema } from 'mongoose'

import { MongooseCV } from '../../types'

export default new Schema<MongooseCV>(
    {
        about: { type: String },
        education: { type: String },
        employers: { type: String },
        isVisible: { type: 'Boolean', required: true },
        location: { type: String },
        name: { type: String, required: true },
        photo: { type: String },
        projects: { type: String },
        skills: { type: String },
        tag: { type: String, required: true },
        title: { type: String, required: true },
        uuid: { type: String, required: true },
    },
    { timestamps: true },
)
