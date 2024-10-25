
export enum Roles { freelancer, employer, admin, user }

export interface User {
    email: string,
    password: string,
    role: Roles,
    profilePicture: string,
    walletAddress: string,
    about: string,
    country: string,
    city: string,
    languages: [{
        languageName: string,
        level: string
    }],
    skills: [string],
}