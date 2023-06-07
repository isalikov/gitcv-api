import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { Education } from '../../types'

const educationSchema = Joi.object<Education>({
    name: Joi.string().required(),
    faculty: Joi.string().required(),
    specialization: Joi.string(),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string(),
})

export default educationSchema
