import { Router } from 'express'

const router = Router()

/**
 * Get CV by ID
 */
router.get('/:id', (req, res) => {
    res.sendStatus(200)
})

/**
 * Create CV
 */
router.post('/', (req, res) => {
    res.sendStatus(200)
})

/**
 * Update CV
 */
router.patch('/:id', (req, res) => {
    res.sendStatus(200)
})

/**
 * Delete CV
 */
router.delete('/:id', (req, res) => {
    res.sendStatus(200)
})

export default router
