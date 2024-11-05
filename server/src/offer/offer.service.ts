import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OfferModel } from './offer.model';
import { Model, Types } from 'mongoose';
import { CreateOfferDto } from './dto/createOffer.dto';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { OfferStatus } from './interface/offer.interface';

@Injectable()
export class OfferService {
    constructor(
        @InjectModel(OfferModel.name) private readonly offerModel: Model<OfferModel>
    ) { }

    async newOffer(createOfferDto: CreateOfferDto): Promise<OfferModel> {
        const offer = await new this.offerModel(createOfferDto).save();
        const offerWithJob = offer.populate('jobId')
        return offerWithJob;
    }

    async getUsersOffer(userId: Types.ObjectId): Promise<OfferModel[]> {
        const offers = await this.offerModel.find({ userId: userId }).populate('jobId')

        return offers
    }

    async getOfferById(offerId: Types.ObjectId): Promise<OfferModel> {
        const offer = await this.offerModel.findById(offerId).populate('jobId');

        if (!offer) {
            throw new HttpException(new ErrorResponseDto('Offer not found', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }
        return offer;
    }

    async updateOffer(offerId: Types.ObjectId, updateOfferDto: UpdateOfferDto): Promise<any> {
        console.log(updateOfferDto);

        const offer = await this.offerModel.findByIdAndUpdate(offerId, updateOfferDto);
        if (!offer) {
            throw new HttpException(new ErrorResponseDto('Offer not found', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }
        return offer
    }

    async deleteOffer(offerId: Types.ObjectId): Promise<any> {
        const offer = await this.offerModel.findByIdAndDelete(offerId);
        if (!offer) {
            throw new HttpException(new ErrorResponseDto('Offer not found', HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
        }
        return offer;
    }

    async acceptOffer(offerId: Types.ObjectId): Promise<OfferModel> {
        const offer = await this.offerModel.findById(offerId);
        
        offer.status = OfferStatus.ACCEPTED
        await offer.save();
        return offer;
    }

    async refuseOffer(offerId: Types.ObjectId): Promise<OfferModel> {
        const offer = await this.offerModel.findById(offerId);

        offer.status = OfferStatus.CANCELED

        return offer;
    }
}
