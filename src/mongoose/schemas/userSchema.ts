import { Schema } from 'mongoose'

import projectSchema from './projectSchema'
import settingsSchema from './settingsSchema'
import spokenSkillSchema from './spokenSkillSchema'

import { defaultSettings } from '../../constants'
import { MongooseUser } from '../../types'

export default new Schema<MongooseUser>(
    {
        name: { type: String, required: true },
        photo: { type: String, required: true },
        projects: { type: [projectSchema], default: [] },
        settings: { type: settingsSchema, default: defaultSettings },
        spokenSkills: { type: [spokenSkillSchema], default: [] },
        uuid: { type: String, required: true },
    },
    { timestamps: true },
)
