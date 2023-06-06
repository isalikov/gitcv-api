import Joi from 'joi'

import languageSchema from './languageSchema'
import projectSchema from './projectSchema'
import skillSchema from './skillSchema'

import { UpdateUserBody } from '../../types'

const updateUserBodySchema = Joi.object<UpdateUserBody>({
    contacts: Joi.object<Record<string, string>>().pattern(Joi.string(), Joi.string()),
    languages: Joi.array().items(languageSchema),
    name: Joi.string(),
    photo: Joi.string().uri(),
    position: Joi.string(),
    profile: Joi.string(),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(skillSchema),
})

export default updateUserBodySchema
