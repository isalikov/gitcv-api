import httpStatus from 'http-status'

import { CvController } from '../controllers'
import { AppRequest, AppResponse } from '../types'
import validate, { updateCvBodySchema } from '../validators'

const updateCv = async (req: AppRequest, res: AppResponse) => {
    const cvController = new CvController(res.locals)

    if (!validate(req, res, updateCvBodySchema)) {
        return
    }

    try {
        const cv = await cvController.update(req.params.tag, req.body)

        if (cv) {
            res.json(cv)
        } else {
            res.sendStatus(httpStatus.NOT_FOUND)
        }
    } catch (e) {
        // TODO: handle error
        console.error(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export default updateCv
