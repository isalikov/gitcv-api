import { Schema } from 'mongoose'

import { Settings } from '../../types'

export default new Schema<Settings>({
    theme: { type: String, required: true },
})
