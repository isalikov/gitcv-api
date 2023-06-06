import Joi from 'joi'

import skillSchema from './skillSchema'
import { Project } from '../../types'

const projectSchema = Joi.object<Project>({
    description: Joi.string(),
    title: Joi.string().required(),
    demoURL: Joi.string(),
    sourceURL: Joi.string(),
    stack: Joi.array().items(skillSchema),
    uuid: Joi.string(),
})

export default projectSchema
