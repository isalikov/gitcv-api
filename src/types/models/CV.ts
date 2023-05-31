import { OutputData } from '@editorjs/editorjs'

import { MongooseTimestamp } from '../shared'

export type CV = {
    about: OutputData
    education: OutputData
    employers: OutputData
    isVisible: boolean
    name: string
    projects: OutputData
    skills: OutputData
    tag: string
    title: string
    uuid: string
    location?: string
    photo?: string
}

export type MongoCV = Omit<CV, 'about' | 'employers' | 'education' | 'projects' | 'skills'> & {
    about?: string
    employers?: string
    education?: string
    projects?: string
    skills?: string
}

export type CVCompact = Pick<CV, 'isVisible' | 'tag' | 'title' | 'uuid'>

export type MongooseCV = MongoCV & MongooseTimestamp
