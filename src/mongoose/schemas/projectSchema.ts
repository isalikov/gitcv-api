import { Schema } from 'mongoose'

import projectLanguageSchema from './projectLanguageSchema'
import { Project } from '../../types'

export default new Schema<Project>({
    about: { type: String },
    languages: { type: [projectLanguageSchema], default: [] },
    readme: { type: String },
    title: { type: String, required: true },
})
