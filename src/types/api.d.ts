import { Response, Request } from 'express'

import * as core from 'express-serve-static-core'

import { IncomingHttpHeaders } from 'http'

export type Headers = {
    session: string | undefined
}

export type AppHeaders = IncomingHttpHeaders & Headers

export type Locals = {
    githubID: number
    githubToken: string
}

export type OpenAIChoice = {
    message: {
        role: string
        content: string
        finish_reason: string
        index: number
    }
}

export type OpenAIBody = {
    choices: OpenAIChoice[]
}

export type AppResponse<B = Record<string, unknown>> = Response<B, Locals>
export type AppRequest<B = Record<string, unknown>> = Request<core.ParamsDictionary, any, B>

export type GenerateEntityBody = {
    repos: number[]
    respective?: string
}
