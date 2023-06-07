import Joi from 'joi'

import { DatePoint } from '../../types'

const datePointSchema = Joi.object<DatePoint>({
    month: Joi.number().required(),
    year: Joi.number().required(),
})

export default datePointSchema
