import Joi from 'joi'

import datePointSchema from './datePointSchema'
import { UpdateEmployerBody } from '../../types'

const createEmployerBodySchema = Joi.object<UpdateEmployerBody>({
    name: Joi.string(),
    position: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, ''),
    from: datePointSchema,
    to: datePointSchema,
    location: Joi.string().allow(null, ''),
    website: Joi.string().allow(null, ''),
})

export default createEmployerBodySchema
