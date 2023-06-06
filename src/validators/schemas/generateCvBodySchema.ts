import Joi from 'joi'

import { GenerateCvBody } from '../../types'

const generateCvBodySchema = Joi.object<GenerateCvBody>({
    title: Joi.string().required(),
    repos: Joi.array().items(Joi.number()).min(1).required(),
})

export default generateCvBodySchema
