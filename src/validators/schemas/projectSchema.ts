import Joi from 'joi'

import skillSchema from './skillSchema'
import { Project } from '../../types'

const projectSchema = Joi.object<Project>({
    description: Joi.string().allow(null, ''),
    title: Joi.string().required(),
    demoURL: Joi.string(),
    sourceURL: Joi.string().uri().allow(null, ''),
    stack: Joi.array().items(skillSchema),
    uuid: Joi.string(),
})

export default projectSchema
