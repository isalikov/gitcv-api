import Joi from 'joi'

import createEducationBodySchema from './createEducationBodySchema'
import createEmployerBodySchema from './createEmployerBodySchema'
import languageSchema from './languageSchema'
import projectSchema from './projectSchema'
import skillSchema from './skillSchema'
import { UpdateCvBody } from '../../types'

const updateCvBodySchema = Joi.object<UpdateCvBody>({
    isVisible: Joi.boolean(),
    languages: Joi.array().items(languageSchema),
    location: Joi.string(),
    name: Joi.string(),
    photo: Joi.string(),
    position: Joi.string(),
    profile: Joi.string(),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(skillSchema),
    title: Joi.string(),
    employers: Joi.array().items(createEmployerBodySchema),
    education: Joi.array().items(createEducationBodySchema),
})

export default updateCvBodySchema
