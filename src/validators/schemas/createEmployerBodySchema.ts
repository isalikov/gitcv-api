import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { CreateEmployerBody } from '../../types'

const createEmployerBodySchema = Joi.object<CreateEmployerBody>({
    name: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string().allow(null, ''),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string().allow(null, ''),
    website: Joi.string().allow(null, ''),
})

export default createEmployerBodySchema
