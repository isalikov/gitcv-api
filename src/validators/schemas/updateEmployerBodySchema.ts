import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { UpdateEmployerBody } from '../../types'

const createEmployerBodySchema = Joi.object<UpdateEmployerBody>({
    name: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string(),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string(),
    website: Joi.string(),
})

export default createEmployerBodySchema
