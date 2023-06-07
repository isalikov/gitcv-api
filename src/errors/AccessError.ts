type Resource<T = number> = {
    id: T
    name: string
    githubID: number
}

class AccessError<T = number> extends Error {
    public readonly resource: Resource<T>
    public readonly status: number

    constructor(resource: Resource<T>, status = 403) {
        super('Access for resource denied')

        this.resource = resource
        this.status = status
    }
}

export default AccessError
