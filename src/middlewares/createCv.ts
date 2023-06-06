import httpStatus from 'http-status'
import Joi from 'joi'

import { CvController } from '../controllers'
import { AppRequest, AppResponse, GenerateEntityBody } from '../types'

const requestBodySchema = Joi.object<GenerateEntityBody>({
    title: Joi.string().required(),
    repos: Joi.array().items(Joi.number()).min(1).required(),
})

const createCv = async (req: AppRequest<GenerateEntityBody>, res: AppResponse) => {
    const { repos, title } = req.body
    const cvController = new CvController(res.locals)

    const validatedResult = requestBodySchema.validate(req.body)

    if (validatedResult.error) {
        res.status(400).json(validatedResult)

        return
    }

    try {
        const cv = await cvController.create(title, repos)

        res.json(cv)
    } catch (e) {
        // TODO: handle error
        console.error(e)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export default createCv
