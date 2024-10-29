import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobModel, JobSchema } from './job.model';
import { JobsController } from './jobs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: JobModel.name, schema: JobSchema }])
  ],
  providers: [JobsService],
  controllers: [JobsController],
  exports: [JobsService]
})
export class JobsModule { }
