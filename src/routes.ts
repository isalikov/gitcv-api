import { Router } from 'express'

import httpStatus from 'http-status'

import { generateNewEntity, getCurrentUser, syncCurrentUser } from './middlewares'

const router = Router()

router.get('/user', getCurrentUser)
router.post('/user/sync', syncCurrentUser)
router.patch('/entity/generate', generateNewEntity)

router.use('*', (req, res) => {
    res.sendStatus(httpStatus.NOT_FOUND)
})

export default router
