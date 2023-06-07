import httpStatus from 'http-status'

import { CvController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, UpdateCvTagBody } from '../types'
import validate, { updateCvTagBodySchema } from '../validators'

const updateCvTag = async (req: AppRequest<UpdateCvTagBody>, res: AppResponse) => {
    const { tag } = req.params
    const { value } = req.body

    const controller = new CvController(res.locals)

    if (!validate(req, res, updateCvTagBodySchema)) {
        return
    }

    if (tag === value) {
        res.sendStatus(httpStatus.CONFLICT)

        return
    }

    try {
        const existCv = await controller.getByTag(value)
        console.log(existCv)

        if (existCv) {
            res.sendStatus(httpStatus.CONFLICT)

            return
        }

        const cv = await controller.updateTag(tag, req.body)

        res.json(cv)
    } catch (e) {
        handleError(res, e)
    }
}

export default updateCvTag
