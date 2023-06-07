import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { Employer } from '../../types'

const employerSchema = Joi.object<Employer>({
    name: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string(),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string(),
    website: Joi.string(),
})

export default employerSchema
