import { CvController } from '../controllers'
import { AppRequest, AppResponse, GenerateEntityBody } from '../types'

const createCv = async (req: AppRequest<GenerateEntityBody>, res: AppResponse) => {
    const { repos, title } = req.body
    const cvController = new CvController(res.locals)
    const cv = await cvController.create(title, repos)

    res.json(cv)
}

export default createCv
