import Joi from 'joi'

import { Skill } from '../../types'

const skillSchema = Joi.object<Skill>({
    involvement: Joi.number().required(),
    title: Joi.string().required(),
    uuid: Joi.string(),
})

export default skillSchema
