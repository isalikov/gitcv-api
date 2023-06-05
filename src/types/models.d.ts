export type Language = {
    title: string
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native'
}

export type Technology = {
    involvement: number
    title: string
}

export type Repo = {
    githubID: number
    name: string
    technologies: Technology[]
    about?: string
    readme?: string
}

export type Cv = {
    name: string
    position: string
    uuid: string
    cvtag: string
    githubID: number
    about?: string
    education?: string
    history?: string
    location?: string
    photo?: string
}

export type User = {
    languages: Language[]
    repos: Repo[]
    githubID: number
    githubLogin: string
    cvs: Cv[]
    about?: string
    name?: string
    photo?: string
    position?: string
}
