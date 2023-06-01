import { Schema } from 'mongoose'

import { defaultSettings } from '../../constants'
import { Settings } from '../../types'

export default new Schema<Settings>({
    locale: { type: String, default: defaultSettings.locale },
    theme: { type: String, default: defaultSettings.theme },
})
