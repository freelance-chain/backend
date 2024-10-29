import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/createJob.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { UpdateJobDto } from './dto/updateJob.dto';
import { ObjectId } from 'mongoose';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobService: JobsService) {
    }

    @Post()
    async createJob(@Body() createJobDto: CreateJobDto) {
        const newJob = await this.jobService.createJob(createJobDto);

        return new ApiResponseDto(true, newJob);
    }

    @Get()
    async getAllJobs() {
        const jobs = await this.jobService.getAllJobs();

        return new ApiResponseDto(true, jobs)
    }

    @Get(':jobId')
    async getJobById(@Param('jobId') jobId: string) {
        const job = await this.jobService.getJobById(jobId);

        return new ApiResponseDto(true, job)
    }

    @Put(':jobId')
    async updateJob(@Param('jobId') jobId: string, @Body() updateJobDto: UpdateJobDto) {
        const result = await this.jobService.updateJob(jobId, updateJobDto)

        return new ApiResponseDto(true, result)
    }

    @Delete(':jobId')
    async deleteJob(@Param('jobId') jobId: string) {
        const result = await this.jobService.deleteJob(jobId);

        return new ApiResponseDto(true, result)
    }

    @Post('/accept/:jobId')
    async acceptJob(@Param('jobId') jobId: string, @Body() freelancer: ObjectId) {
        const result = await this.jobService.acceptOffer(jobId, freelancer);

        // connect smart contract and new job func
        // get transaction id
        // result.job.blockchainTransactionId = transactionId;
        // await result.job.save();

        return result
    }
}