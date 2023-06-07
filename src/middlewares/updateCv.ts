import { CvController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse } from '../types'
import validate, { updateCvBodySchema } from '../validators'

const updateCv = async (req: AppRequest, res: AppResponse) => {
    const cvController = new CvController(res.locals)

    if (!validate(req, res, updateCvBodySchema)) {
        return
    }

    try {
        const cv = await cvController.update(req.params.tag, req.body)

        res.json(cv)
    } catch (e) {
        handleError(res, e)
    }
}

export default updateCv
