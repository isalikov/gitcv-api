import { ProjectLanguage } from './ProjectLanguage'

export type Project = {
    languages: ProjectLanguage[]
    title: string
    about?: string
    readme?: string
}
