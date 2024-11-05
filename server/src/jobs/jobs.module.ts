import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModel, JobSchema } from './job.model';
import { JobsController } from './jobs.controller';
import { ContractService } from 'src/contract/contract.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JobModel.name, schema: JobSchema }]),
  ],
  providers: [JobsService, ContractService],
  controllers: [JobsController],
  exports: [JobsService, MongooseModule]
})
export class JobsModule { }
