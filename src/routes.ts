import { Router } from 'express'

import httpStatus from 'http-status'

import { createCv, getCurrentUser, syncCurrentUser, updateCurrentUser, updateCv, updateCvTag } from './middlewares'

const router = Router()

router.get('/user', getCurrentUser)
router.patch('/user', updateCurrentUser)
router.post('/user/sync', syncCurrentUser)
router.post('/cv', createCv)
router.patch('/cv/:tag', updateCv)
router.put('/tag/:tag', updateCvTag)

router.use('*', (req, res) => {
    res.sendStatus(httpStatus.NOT_IMPLEMENTED)
})

export default router
