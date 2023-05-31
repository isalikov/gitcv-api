import { Response } from 'express'

import { Locals } from './Locals'

export type AppResponse<B = Record<string, unknown>> = Response<B, Locals>
