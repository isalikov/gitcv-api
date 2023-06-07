import httpStatus from 'http-status'

import { EducationController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse } from '../types'

const getEducationByID = async (req: AppRequest, res: AppResponse) => {
    const controller = new EducationController(res.locals)

    const id = parseInt(req.params.id, 10)

    if (!id || Number.isNaN(id)) {
        res.sendStatus(httpStatus.BAD_REQUEST)

        return
    }

    try {
        const result = await controller.getByID(id)

        if (result) {
            res.json(result)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        handleError(res, e)
    }
}

export default getEducationByID
