import Joi from 'joi'

import languageSchema from './languageSchema'
import projectSchema from './projectSchema'
import skillSchema from './skillSchema'

import { UpdateUserBody } from '../../types'

const updateUserBodySchema = Joi.object<UpdateUserBody>({
    name: Joi.string(),

    contacts: Joi.object<Record<string, string>>().pattern(Joi.string(), Joi.string()),
    languages: Joi.array().items(languageSchema),
    photo: Joi.string().uri().allow(null, ''),
    position: Joi.string().allow(null, ''),
    profile: Joi.string().allow(null, ''),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(skillSchema),
})

export default updateUserBodySchema
