import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { UpdateEducationBody } from '../../types'

const updateEducationSchema = Joi.object<UpdateEducationBody>({
    name: Joi.string(),
    faculty: Joi.string().allow(null, ''),
    specialization: Joi.string().allow(null, ''),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string().allow(null, ''),
})

export default updateEducationSchema
