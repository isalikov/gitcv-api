import { Router } from 'express'

import CVRouter from './cv'
import UserRouter from './user'

import NotFound from '../middlewares/NotFound'

const routes = Router()

routes.use('/cv', CVRouter)
routes.use('/user', UserRouter)

routes.use('*', NotFound)

export default routes
