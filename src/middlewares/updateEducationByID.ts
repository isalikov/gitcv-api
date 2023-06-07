import httpStatus from 'http-status'

import { EducationController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, UpdateEducationBody } from '../types'
import validate, { updateEducationSchema } from '../validators'

const updateEducationByID = async (req: AppRequest<UpdateEducationBody>, res: AppResponse) => {
    const controller = new EducationController(res.locals)

    const id = parseInt(req.params.id, 10)

    if (!id || Number.isNaN(id)) {
        res.sendStatus(httpStatus.BAD_REQUEST)

        return
    }

    if (!validate(req, res, updateEducationSchema)) {
        return
    }

    try {
        const result = await controller.update(id, req.body)

        if (result) {
            res.json(result)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        handleError(res, e)
    }
}

export default updateEducationByID
