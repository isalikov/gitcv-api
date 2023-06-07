import { Router } from 'express'

import httpStatus from 'http-status'

import {
    createCv,
    createEducation,
    createEmployer,
    deleteEducationByID,
    deleteEmployerByID,
    getCurrentUser,
    getEducationByID,
    getEmployerByID,
    syncCurrentUser,
    updateCurrentUser,
    updateCv,
    updateCvTag,
    updateEducationByID,
    updateEmployerByID,
} from './middlewares'

const router = Router()

/**
 * Get current user
 */
router.get('/user', getCurrentUser)

/**
 * Update current user
 */
router.patch('/user', updateCurrentUser)

/**
 * Sync current user with GitHub
 */
router.post('/user/sync', syncCurrentUser)

/**
 * Create user's CV
 */
router.post('/cv', createCv)

/**
 * Update CV by Tag
 */
router.patch('/cv/:tag', updateCv)

/**
 * Update Tag for CV
 */
router.put('/tag/:tag', updateCvTag)

/**
 * Get user's education by ID
 */
router.get('/edu/:id', getEducationByID)

/**
 * Create user's education
 */
router.post('/edu', createEducation)

/**
 * Update user's education by ID
 */
router.patch('/edu/:id', updateEducationByID)

/**
 * Delete user's education by ID
 */
router.delete('/edu/:id', deleteEducationByID)

/**
 * Get user's employer by ID
 */
router.get('/employer/:id', getEmployerByID)

/**
 * Create user's employer
 */
router.post('/employer', createEmployer)

/**
 * Update user's employer by ID
 */
router.patch('/employer/:id', updateEmployerByID)

/**
 * Delete user's employer by ID
 */
router.delete('/employer/:id', deleteEmployerByID)

router.use('*', (req, res) => {
    res.sendStatus(httpStatus.NOT_IMPLEMENTED)
})

export default router
