import { AxiosError } from 'axios'

import httpStatus from 'http-status'

import AccessError from './AccessError'
import { AppResponse } from '../types'

const handleError = (res: AppResponse, error: AxiosError | AccessError): void => {
    console.error(error)

    if (error instanceof AxiosError) {
        res.sendStatus(httpStatus.SERVICE_UNAVAILABLE)

        return
    }

    if (error instanceof AccessError) {
        res.sendStatus(httpStatus.FORBIDDEN)

        return
    }

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
}

export { default as AccessError } from './AccessError'
export default handleError
