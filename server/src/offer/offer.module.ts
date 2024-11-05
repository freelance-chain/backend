import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferModel, OfferSchema } from './offer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OfferModel.name, schema: OfferSchema }])
  ],
  providers: [OfferService],
  controllers: [OfferController],
  exports:[OfferService]
})
export class OfferModule { }
