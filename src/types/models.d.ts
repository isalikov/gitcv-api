import { OutputData } from '@editorjs/editorjs'

export type Language = {
    title: string
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native'
}

export type Technology = {
    involvement: number
    title: string
}

export type Repo = {
    id: number
    name: string
    technologies: Technology[]
    about?: string
    readme?: string
}

export type Entity = {
    name: string
    position: string
    uuid: string
    githubID: number
    sections: {
        about: OutputData
        education: OutputData
        history: OutputData
    }
    location?: string
    photo?: string
}

export type User = {
    languages: Language[]
    repos: Repo[]
    githubID: number
    githubLogin: string
    entities: Entity[]
    about?: string
    name?: string
    photo?: string
    position?: string
}
