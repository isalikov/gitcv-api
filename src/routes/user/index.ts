import { Router } from 'express'

const router = Router()

/**
 * Initial app state
 */
router.get('/', (req, res) => {
    res.sendStatus(200)
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
