import { CvController } from '../controllers'
import handleError from '../errors'
import { AppRequest, AppResponse, GenerateCvBody } from '../types'
import validate, { generateCvBodySchema } from '../validators'

const createCv = async (req: AppRequest<GenerateCvBody>, res: AppResponse) => {
    const { repos, title } = req.body
    const cvController = new CvController(res.locals)

    if (!validate(req, res, generateCvBodySchema)) {
        return
    }

    try {
        const cv = await cvController.create(title, repos)

        res.json(cv)
    } catch (e) {
        handleError(res, e)
    }
}

export default createCv
