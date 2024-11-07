import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from 'mongoose'
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
    })
    employerWallet: string;

    @Prop()
    freelancerWallet: string;
    
    @Prop({
        default: JobStatus.OPEN
    })
    status: JobStatus;
    
    @Prop()
    blockchainTransaction: string;
    
    @Prop({
        required:true
    })
    projectType: string;
    
    @Prop()
    desiredLevel: string;
    
    @Prop()
    proposalDescription?: string;

    @Prop({required:true, ref:'CategoryModel'})
    categoryIds: Types.ObjectId[];
}


export const JobSchema = SchemaFactory.createForClass(JobModel)