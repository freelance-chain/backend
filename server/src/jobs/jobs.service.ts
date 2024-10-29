import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { JobModel } from './job.model';
import { CreateJobDto } from './dto/createJob.dto';
import { UpdateJobDto } from './dto/updateJob.dto';
import { JobStatus } from './interface/job.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(JobModel.name) private readonly jobModel: Model<JobModel>
    ) { }

    async createJob(createJobDto: CreateJobDto): Promise<JobModel> {
        const newJob = await new this.jobModel(createJobDto).save();

        return newJob;
    }

    async getAllJobs(): Promise<JobModel[]> {
        const jobs = await this.jobModel.find().exec();

        return jobs;
    }

    async getJobById(jobId: string): Promise<JobModel> {
        const job = await this.jobModel.findById(jobId);
        if (!job) {
            throw new HttpException(new ErrorResponseDto('Job not found!', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return job;
    }

    async updateJob(jobId: string, updateJobDto: UpdateJobDto): Promise<any> {
        const job = await this.jobModel.findByIdAndUpdate(jobId, updateJobDto);
        if (!job) {
            throw new HttpException(new ErrorResponseDto('Job not found!', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return job;
    }

    async deleteJob(jobId: string): Promise<any> {
        const job = await this.jobModel.findByIdAndDelete(jobId);
        if (!job) {
            throw new HttpException('Job not found!', HttpStatus.NOT_FOUND);
        }

        return { message: "Job successfully deleted!" };
    }

    async acceptOffer(jobId: string, freelancer: ObjectId): Promise<any> {
        const job = await this.jobModel.findById(jobId);
        if (!job) {
            throw new HttpException('Job not found!', HttpStatus.NOT_FOUND);
        }

        job.freelancer = freelancer;
        job.status = JobStatus.PROGRESS;

        await job.save();

        return { message: "Job successfully accepted!", job }
    }
}