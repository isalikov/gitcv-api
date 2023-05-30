import { Project } from './Project'
import { Settings } from './Settings'
import { SpokenSkill } from './SpokenSkill'

export type User = {
    name: string
    projects: Project[]
    settings: Settings
    spokenSkills: SpokenSkill[]
    uuid: string
}
