import { Router } from 'express'

import { getUserByUUID, syncUser } from '../../services/user'
import { AppResponse } from '../../types'

const router = Router()

router.get('/', async (req, res: AppResponse) => {
    try {
        const user = await getUserByUUID(res.locals)

        res.json(user)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

/**
 * Update user
 */
router.patch('/', (req, res) => {
    res.sendStatus(200)
})

/**
 * Sync user's GitHub profile
 */
router.post('/sync', async (req, res: AppResponse) => {
    try {
        const user = await syncUser(res.locals)

        res.json(user)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
})

export default router
