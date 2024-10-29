import { ObjectId } from "mongoose";

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
    employer: ObjectId,
    freelancer: ObjectId,
    status: JobStatus,
    blockchainTransactionId: string,
    projectType: string,
    desiredLevel: string,
    proposalDescription?: string
}