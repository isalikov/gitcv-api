import { Router } from 'express'

import { getUserByUUID } from '../../services/user'
import { AppResponse } from '../../types'

const router = Router()

/**
 * Initial app state
 */
router.get('/', async (req, res: AppResponse) => {
    try {
        const user = await getUserByUUID(res.locals)

        res.json(user)
    } catch (e) {
        // TODO: handle error
        res.sendStatus(500)
    }
})

/**
 * Update user settings
 */
router.patch('/settings', (req, res) => {
    res.sendStatus(200)
})

/**
 * Sync user's GitHub profile
 */
router.post('/sync', (req, res) => {
    res.sendStatus(200)
})

export default router
