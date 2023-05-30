import { OutputData } from '@editorjs/editorjs'

export type Document = {
    about: OutputData
    education: OutputData
    employers: OutputData
    isVisible: boolean
    location: string
    name: string
    photo: string
    projects: OutputData
    skills: OutputData
    tag: string
    title: string
    uuid: string
}
