import { CVCompact } from './CV'
import { Project } from './Project'
import { Settings } from './Settings'
import { SpokenSkill } from './SpokenSkill'
import { MongooseTimestamp } from '../shared'

export type User = {
    CVs: CVCompact[]
    name: string
    photo: string
    projects: Project[]
    settings: Settings
    spokenSkills: SpokenSkill[]
    uuid: string
}

export type MongooseUser = User & MongooseTimestamp
