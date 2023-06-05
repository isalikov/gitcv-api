import axios, { AxiosInstance } from 'axios'

import config from '../config'
import { Repo, User, OpenAIBody } from '../types'

export class OpenAIController {
    private request: AxiosInstance

    constructor() {
        this.request = axios.create({
            baseURL: 'https://api.openai.com/v1',
            headers: {
                Authorization: `Bearer ${config.OPENAI_KEY}`,
            },
        })
    }

    private getBody(text: string) {
        return {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: text }],
        }
    }

    private getProject(repo: Repo, index: number): string {
        const language = repo.technologies.sort((a, b) => b.involvement - a.involvement)

        return `
        -------------------------------------------------------------------
        # ${index} ${repo.name}
        This project is a github repository written at ${language} language.

        Description: ${repo.about}

        README.md:
        ${repo.readme}
        `
    }

    private getProjects(user: User, repos: number[]): string {
        const projects = user.repos.filter((repo) => {
            return repos.findIndex((githubID) => repo.githubID === githubID) > -1
        })

        return projects.map(this.getProject).join('\n')
    }

    public async getAboutText(user: User, repos: number[]): Promise<string> {
        const text = `
            Generate "about section" for CV (2000 symbols limit)
            This CV should be in Markdown.
            Use next data parsed from github account:

            Position: ${user.position}

            Open Source Projects:
            ${this.getProjects(user, repos)}
        `

        const { data } = await this.request.post<OpenAIBody>('/chat/completions', this.getBody(text))
        const [result] = data.choices

        return result.message.content
    }
}
