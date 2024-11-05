import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/createJob.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { UpdateJobDto } from './dto/updateJob.dto';
import { Types } from 'mongoose';
import { ContractService } from 'src/contract/contract.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobService: JobsService, private readonly contractService: ContractService) {
    }

    @Post()
    async createJob(@Body() createJobDto: CreateJobDto) {
        const newJob = await this.jobService.createJob(createJobDto);

        return new ApiResponseDto(true, newJob);
    }

    @Public()
    @Roles('user')
    @Get()
    async getAllJobs() {
        const jobs = await this.jobService.getAllJobs();
        // await this.contractService.getAllJobs();

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

    @Post('/complete/:jobId')
    async completeJob(@Param('jobId') jobId: Types.ObjectId) {
        const result = await this.jobService.completeJob(jobId);
        
        await this.contractService.completeJob(jobId, result.freelancerWallet);

        return new ApiResponseDto(true, { message: "Job successfully pointed to completed and successfully delivered to blockchain", job: result });

    }

    @Post('/approve/:jobId')
    async approveJob(@Param('jobId') jobId: Types.ObjectId) {
        const result = await this.jobService.approveJob(jobId);

        await this.contractService.approveJob(jobId, result.employerWallet);

        return new ApiResponseDto(true, { message: "Job successfully pointed to approved and successfully delivered to blockchain", job: result });

    }
}
