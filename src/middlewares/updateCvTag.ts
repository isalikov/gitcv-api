import httpStatus from 'http-status'

import { CvController } from '../controllers'
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

export default updateCvTag
