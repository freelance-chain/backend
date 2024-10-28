
export enum Roles { 
    Freelancer = "freelancer", 
    Employer = "employer",
    Admin = "admin", 
    User = "user"
 }

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
    skills: string[],
}