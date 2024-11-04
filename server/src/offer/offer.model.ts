import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { OfferStatus, Offer } from "./interface/offer.interface";

export type OfferDocument = Offer & Document;

@Schema({ timestamps: true })
export class OfferModel extends Document implements Offer {
    @Prop({ type: Types.ObjectId, ref: "Job", required: true })
    jobId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    amount: number;

    @Prop()
    description: string;

    @Prop({ default: OfferStatus.PENDING })
    status: OfferStatus;

}