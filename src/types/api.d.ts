import { Response, Request } from 'express'

import * as core from 'express-serve-static-core'

import { Cv, Education, Employer, User } from './models'
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
export type AppRequest<B = Record<string, unknown>> = Request<core.ParamsDictionary, never, B>

export type GenerateCvBody = {
    repos: number[]
    title: string
}

export type UpdateUserBody = Partial<
    Pick<User, 'contacts' | 'languages' | 'name' | 'photo' | 'profile' | 'projects' | 'position' | 'skills'>
>

export type UpdateCvBody = Partial<Omit<Cv, 'id' | 'tag' | 'isVerified' | 'createdAt' | 'updatedAt'>>

export type UpdateCvTagBody = {
    value: string
}

export type CreateEmployerBody = Omit<Employer, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateEmployerBody = Partial<CreateEmployerBody>

export type CreateEducationBody = Omit<Education, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateEducationBody = Partial<CreateEducationBody>
