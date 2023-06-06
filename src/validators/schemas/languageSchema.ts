import Joi from 'joi'

import { VALID_LANGUAGE_LEVELS } from '../../constants'
import { Language } from '../../types'

const languageSchema = Joi.object<Language>({
    level: Joi.string()
        .valid(...VALID_LANGUAGE_LEVELS)
        .required(),
    title: Joi.string().required(),
})

export default languageSchema
