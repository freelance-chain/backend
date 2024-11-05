import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { Types } from 'mongoose';
import { UpdateOfferDto } from './dto/updateOffer.dto';

@Controller('offer')
export class OfferController {
    constructor(
        private readonly offerService: OfferService
    ) { }

    @Post()
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        const newOffer = await this.offerService.newOffer(createOfferDto);

        return new ApiResponseDto(true, newOffer)
    }

    @Get('/user/:userId')
    async getUsersOffer(@Param('userId') userId: Types.ObjectId) {
        const offers = await this.offerService.getUsersOffer(userId);

        return new ApiResponseDto(true,offers)
    }

    @Get(':offerId')
    async getOfferById(@Param('offerId') offerId:Types.ObjectId) {
        const offer = await this.offerService.getOfferById(offerId);

        return new ApiResponseDto(true,offer)
    }

    @Put(':offerId')
    async updateOffer(@Param('offerId') offerId:Types.ObjectId, @Body() updateOfferDto:UpdateOfferDto) {
        const result = await this.offerService.updateOffer(offerId,updateOfferDto)

        return new ApiResponseDto(true,result)
    }

    @Delete(':offerId')
    async deleteOffer(@Param('offerId') offerId:Types.ObjectId) {
        const result = await this.offerService.deleteOffer(offerId)

        return new ApiResponseDto(true,result)
    }
}
