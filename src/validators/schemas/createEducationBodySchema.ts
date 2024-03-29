import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { CreateEducationBody } from '../../types'

const createEducationBodySchema = Joi.object<CreateEducationBody>({
    name: Joi.string().required(),
    faculty: Joi.string().required(),
    specialization: Joi.string().allow(null, ''),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string().allow(null, ''),
})

export default createEducationBodySchema
