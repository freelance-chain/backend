import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferModel, OfferSchema } from './offer.model';
import { ContractService } from 'src/contract/contract.service';
import { JobsService } from 'src/jobs/jobs.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OfferModel.name, schema: OfferSchema }]),
    JobsModule
  ],
  providers: [OfferService, ContractService, JobsService],
  controllers: [OfferController],
  exports: [OfferService]
})
export class OfferModule { }
