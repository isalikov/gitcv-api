import { Router } from 'express'

const router = Router()

/**
 * Get document by ID
 */
router.get('/:id', (req, res) => {
    res.sendStatus(200)
})

/**
 * Create document
 */
router.post('/', (req, res) => {
    res.sendStatus(200)
})

/**
 * Update document
 */
router.patch('/:id', (req, res) => {
    res.sendStatus(200)
})

/**
 * Delete document
 */
router.delete('/:id', (req, res) => {
    res.sendStatus(200)
})

export default router
