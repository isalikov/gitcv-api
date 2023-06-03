import { ProjectLanguage } from './ProjectLanguage'

export type Project = {
    id: number
    languages: ProjectLanguage[]
    title: string
    about?: string
    readme?: string
}
