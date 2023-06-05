import axios from 'axios'

import config from '../config'
import { OpenAIBody, Repo, User } from '../types'

const headers = {
    Authorization: `Bearer ${config.OPENAI_KEY}`,
}

const getBody = (text: string) => ({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }],
})
const getSpokenSkills = (user: User): string => {
    const result = user.languages.reduce<string[]>((result, skill) => {
        return [...result, `${skill.title} (level: ${skill.level})`]
    }, [])

    if (result.length === 0) {
        return ''
    }

    return `
    Speaking Languages:
    ${result.join('\n')}
    `
}

export const getProject = (repo: Repo, index: number): string => {
    const language = repo.technologies.sort((a, b) => a.involvement - b.involvement)

    return `
    -----------------------------------------------------------------------------
    # ${index} ${repo.name}
    This project is a github repository written at ${language} language.

    Description: ${repo.about}

    README.md:
    ${repo.readme}
    `
}

export const getProjects = (user: User, repos: number[]): string => {
    const projects = user.repos.filter((repo) => {
        return repos.findIndex((id) => repo.id === id) > -1
    })

    return projects.map(getProject).join('\n')
}

export const generateCV = async (user: User, repos: number[], respective?: string): Promise<string> => {
    const text = `
        Generate "about section" for CV.
        This CV should be in Markdown.
        Use next data parsed from github account:

        Position: ${user.position}
        ${respective ? 'About: \n' + respective : ''}
        ${getSpokenSkills(user)}

        Projects:
        ${getProjects(user, repos)}
    `

    const { data } = await axios.post<OpenAIBody>('https://api.openai.com/v1/chat/completions', getBody(text), {
        headers,
    })

    const [result] = data.choices

    return result.message.content
}
