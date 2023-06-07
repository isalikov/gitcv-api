import httpStatus from 'http-status'
import { ObjectSchema } from 'joi'

import { AppRequest, AppResponse } from '../types'

const validate = <T>(req: AppRequest<T>, res: AppResponse, schema: ObjectSchema<T>): boolean => {
    if (Object.keys(req.body).length === 0) {
        res.sendStatus(httpStatus.BAD_REQUEST)

        return false
    }

    const validatedResult = schema.validate(req.body)

    if (validatedResult.error) {
        res.status(httpStatus.BAD_REQUEST).json(validatedResult)

        return false
    }

    return true
}

export { default as generateCvBodySchema } from './schemas/generateCvBodySchema'
export { default as languageSchema } from './schemas/languageSchema'
export { default as skillSchema } from './schemas/skillSchema'
export { default as updateCvBodySchema } from './schemas/updateCvBodySchema'
export { default as updateUserBodySchema } from './schemas/updateUserBodySchema'

export default validate
