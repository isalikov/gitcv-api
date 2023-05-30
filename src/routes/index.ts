import { Router } from 'express'

import DocumentRouter from './document'
import UserRouter from './user'

import NotFound from '../middlewares/NotFound'

const routes = Router()

routes.use('/document', DocumentRouter)
routes.use('/user', UserRouter)

routes.use('*', NotFound)

export default routes
