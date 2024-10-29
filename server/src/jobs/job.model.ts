import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose'
import { Job, JobStatus } from "./interface/job.interface";

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class JobModel extends Document implements Job {
    @Prop({
        required:true
    })
    title: string;
    
    @Prop({
        required:true
    })
    description: string;
    
    @Prop({
        required:true
    })
    budget: number;
    
    @Prop({
        required:true
    })
    skillsRequired: string[];
    
    @Prop({
        required:true,
        ref:'User'
    })
    employer: mongoose.Schema.Types.ObjectId;

    @Prop({
        ref:'User'
    })
    freelancer: mongoose.Schema.Types.ObjectId;
    
    @Prop({
        default: JobStatus.OPEN
    })
    status: JobStatus;
    
    @Prop()
    blockchainTransactionId: string;
    
    @Prop({
        required:true
    })
    projectType: string;
    
    @Prop()
    desiredLevel: string;
    
    @Prop()
    proposalDescription?: string;

}


export const JobSchema = SchemaFactory.createForClass(JobModel)