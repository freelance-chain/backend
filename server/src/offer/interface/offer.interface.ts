import { Types } from "mongoose";

export enum OfferStatus {
    PENDING= "pending",
    ACCEPTED = "accepted",
    CANCELED = "cancaled"
}

export interface Offer {
    jobId: Types.ObjectId,
    userId: Types.ObjectId,
    amount: number,
    description: string,
    status: OfferStatus
}