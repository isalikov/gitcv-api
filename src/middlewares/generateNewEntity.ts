import { AppRequest, AppResponse, GenerateEntityBody } from '../types'

const generateNewEntity = async (req: AppRequest<GenerateEntityBody>, res: AppResponse) => {
    res.sendStatus(200)
}

export default generateNewEntity
