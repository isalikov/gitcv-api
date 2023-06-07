import { EmployerController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, CreateEmployerBody } from '../types'
import validate, { createEmployerBodySchema } from '../validators'

const createEmployer = async (req: AppRequest<CreateEmployerBody>, res: AppResponse) => {
    const controller = new EmployerController(res.locals)

    if (!validate(req, res, createEmployerBodySchema)) {
        return
    }

    try {
        const result = await controller.create(req.body)

        if (result) {
            res.json(result)
        } else {
            res.sendStatus(404)
        }
    } catch (e) {
        handleError(res, e)
    }
}

export default createEmployer
