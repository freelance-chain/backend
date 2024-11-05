import { Types } from "mongoose";

export enum JobStatus {
    OPEN = "open",
    PROGRESS = "progress",
    COMPLETED = "completed",
    CLOSED = "closed",
    CANCELED = "canceled"
}

export interface Job {
    title: string,
    description: string,
    budget: number,
    skillsRequired: string[],
    employerWallet: string,
    freelancerWallet: string,
    status: JobStatus,
    blockchainTransaction: string,
    projectType: string,
    desiredLevel: string,
    proposalDescription?: string
}