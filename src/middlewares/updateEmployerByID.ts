import httpStatus from 'http-status'

import { EmployerController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, UpdateEmployerBody } from '../types'
import validate, { updateEmployerBodySchema } from '../validators'

const updateEmployerByID = async (req: AppRequest<UpdateEmployerBody>, res: AppResponse) => {
    const controller = new EmployerController(res.locals)

    const id = parseInt(req.params.id, 10)

    if (!id || Number.isNaN(id)) {
        res.sendStatus(httpStatus.BAD_REQUEST)

        return
    }

    if (!validate(req, res, updateEmployerBodySchema)) {
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

export default updateEmployerByID
