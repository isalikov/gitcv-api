import Joi from 'joi'

import educationSchema from './educationSchema'
import employerSchema from './employerSchema'
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
    employers: Joi.array().items(employerSchema),
    education: Joi.array().items(educationSchema),
})

export default updateCvBodySchema
