import { Schema } from 'mongoose'

import { ProjectLanguage } from '../../types'

export default new Schema<ProjectLanguage>({
    involvement: { type: Number, required: true },
    title: { type: String, required: true },
})
