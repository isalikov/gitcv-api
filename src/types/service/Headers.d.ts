import { IncomingHttpHeaders } from 'http'

export type Headers = {
    session: string | undefined
}

export type AppHeaders = IncomingHttpHeaders & Headers
