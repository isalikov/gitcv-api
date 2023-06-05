import EntityController from '../controllers/EntityController'
import { AppRequest, AppResponse, GenerateEntityBody } from '../types'

const generateNewEntity = async (req: AppRequest<GenerateEntityBody>, res: AppResponse) => {
    const entityController = new EntityController(res.locals)
    const entity = await entityController.create(req.body.repos)

    res.json(entity)
}

export default generateNewEntity
