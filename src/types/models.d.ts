import { Timestamps, UniqueArray } from './shared'

export type Language = {
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'beginner' | 'native'
    title: string
}

export type DatePoint = {
    month: string
    year: string
}

export type Skill = {
    involvement: number
    title: string
    uuid?: string
}

export type Repo = {
    id: number
    stack: Skill[]
    title: string
    createdAt: number
    updatedAt: number
    about?: string
    readme?: string
}

export type Employer = {
    id: number
    name: string
    position: string
    createdAt: number
    updatedAt: number
    description?: string
    from?: DatePoint
    to?: DatePoint
    location?: string
    website?: string
}

export type Education = {
    id: number
    name: string
    faculty: string
    specialization: string
    createdAt: number
    updatedAt: number
    from?: DatePoint
    to?: DatePoint
    location?: string
}

export type Project = {
    uuid: string
    description: string
    title: string
    stack: Skill[]
    demoURL?: string
    sourceURL?: string
}

export type Cv = {
    id: number
    tag: string
    title: string
    isVerified: boolean
    isVisible: boolean
    education: UniqueArray<Omit<Education, Timestamps>>
    employers: UniqueArray<Omit<Employer, Timestamps>>
    languages: UniqueArray<Language>
    location: string
    name: string
    position: string
    profile: string
    projects: UniqueArray<Project>
    skills: UniqueArray<Skill>
    createdAt: number
    updatedAt: number
    photo?: string
}

export type User = {
    id: number
    login: string
    contacts: Record<string, string>
    cvs: Cv[]
    education: Education[]
    employers: Employer[]
    languages: UniqueArray<Language>
    name: string
    photo: string
    profile: string
    projects: UniqueArray<Project>
    position: string
    repos: Repo[]
    skills: UniqueArray<Skill>
    createdAt: number
    updatedAt: number
}
