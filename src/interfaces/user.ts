export interface IUser {
    github_id: number;
    login: string;
    node_id: string;
    avatar_url: string;
    url: string;
    repos_url: string;
    type: string;
    name: string;
    company: string | null;
    location: string;
    email: string | null;
    hireable: boolean;
    bio: string;
    public_repos: number;
    created_at: string;
    updated_at: string;
}
