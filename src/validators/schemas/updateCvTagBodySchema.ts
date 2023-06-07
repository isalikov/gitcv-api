import Joi from 'joi'

import { VALID_TAG } from '../../constants'
import { UpdateCvTagBody } from '../../types'

const updateCvTagBodySchema = Joi.object<UpdateCvTagBody>({
    value: Joi.string().pattern(VALID_TAG, 'Letter, Numbers, Underscore and Dash'),
})

export default updateCvTagBodySchema
