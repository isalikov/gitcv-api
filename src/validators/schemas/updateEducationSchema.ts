import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { UpdateEducationBody } from '../../types'

const updateEducationSchema = Joi.object<UpdateEducationBody>({
    name: Joi.string(),
    faculty: Joi.string(),
    specialization: Joi.string(),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string(),
})

export default updateEducationSchema
