import { Types } from "mongoose";

export enum OfferStatus {
    PENDING= "pending",
    ACCEPTED = "accepted",
    CANCELED = "cancaled"
}

export interface Offer {
    jobId: Types.ObjectId,
    employerWallet: string,
    freelancerWallet: string,
    amount: number,
    description: string,
    status: OfferStatus
}