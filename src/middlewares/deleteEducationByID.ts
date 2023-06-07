import httpStatus from 'http-status'

import { EducationController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse } from '../types'

const deleteEducationByID = async (req: AppRequest, res: AppResponse) => {
    const controller = new EducationController(res.locals)

    const id = parseInt(req.params.id, 10)

    if (!id || Number.isNaN(id)) {
        res.sendStatus(httpStatus.BAD_REQUEST)

        return
    }

    try {
        await controller.delete(id)

        res.sendStatus(httpStatus.OK)
    } catch (e) {
        handleError(res, e)
    }
}

export default deleteEducationByID
