export type Profile = {
    time: string;
    blocks: object[];
};

export type User = {
    email: string | null;
    login: string;
    name: string;
    photo: string;
    profile: Array<Profile>;
};
