import { Schema } from 'mongoose'

import { SpokenSkill } from '../../types'

export default new Schema<SpokenSkill>({
    level: { type: String, required: true },
    name: { type: String, required: true },
})
