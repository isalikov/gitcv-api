import { Router } from 'express'

import httpStatus from 'http-status'

import { createCv, getCurrentUser, syncCurrentUser } from './middlewares'

const router = Router()

router.get('/user', getCurrentUser)
router.post('/user/sync', syncCurrentUser)
router.post('/cv', createCv)

router.use('*', (req, res) => {
    res.sendStatus(httpStatus.NOT_FOUND)
})

export default router
