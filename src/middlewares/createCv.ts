import { CVController } from '../controllers'
import { AppRequest, AppResponse, GenerateEntityBody } from '../types'

const createCv = async (req: AppRequest<GenerateEntityBody>, res: AppResponse) => {
    const cvController = new CVController(res.locals)
    const cv = await cvController.create(req.body.repos)

    res.json(cv)
}

export default createCv
