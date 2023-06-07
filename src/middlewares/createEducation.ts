import { EducationController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, CreateEducationBody } from '../types'
import validate, { createEducationBodySchema } from '../validators'

const createEducation = async (req: AppRequest<CreateEducationBody>, res: AppResponse) => {
    const controller = new EducationController(res.locals)

    if (!validate(req, res, createEducationBodySchema)) {
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

export default createEducation
