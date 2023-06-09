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
    location: Joi.string().allow(null, ''),
    name: Joi.string(),
    photo: Joi.string().allow(null, ''),
    position: Joi.string().allow(null, ''),
    profile: Joi.string().allow(null, ''),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(skillSchema),
    title: Joi.string(),
    employers: Joi.array().items(createEmployerBodySchema),
    education: Joi.array().items(createEducationBodySchema),
})

export default updateCvBodySchema
