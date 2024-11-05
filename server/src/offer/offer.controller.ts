import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { Types } from 'mongoose';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { ContractService } from 'src/contract/contract.service';
import { JobsService } from 'src/jobs/jobs.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('offer')
export class OfferController {
    constructor(
        private readonly offerService: OfferService,
        private readonly contractService: ContractService,
        private readonly jobService: JobsService
    ) { }

    @Roles('freelancer','admin')
    @Post()
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        const newOffer = await this.offerService.newOffer(createOfferDto);

        return new ApiResponseDto(true, newOffer)
    }

    @Public()
    @Get('/user/:userId')
    async getUsersOffer(@Param('userId') userId: Types.ObjectId) {
        const offers = await this.offerService.getUsersOffer(userId);

        return new ApiResponseDto(true, offers)
    }

    @Public()
    @Get(':offerId')
    async getOfferById(@Param('offerId') offerId: Types.ObjectId) {
        const offer = await this.offerService.getOfferById(offerId);

        return new ApiResponseDto(true, offer)
    }

    @Roles('freelancer','admin')
    @Put(':offerId')
    async updateOffer(@Param('offerId') offerId: Types.ObjectId, @Body() updateOfferDto: UpdateOfferDto) {
        const result = await this.offerService.updateOffer(offerId, updateOfferDto)

        return new ApiResponseDto(true, result)
    }

    @Roles('freelancer','admin')
    @Delete(':offerId')
    async deleteOffer(@Param('offerId') offerId: Types.ObjectId) {
        const result = await this.offerService.deleteOffer(offerId)

        return new ApiResponseDto(true, result)
    }

    @Roles('employer','admin')
    @Post('/accept/:offerId')
    async acceptOffer(@Param('offerId') offerId: Types.ObjectId) {
        const offer = await this.offerService.acceptOffer(offerId);

        // connect to smart contract
        const newJobDto = {
            id: String(offer.jobId),
            employer: offer.employerWallet,
            employee: offer.freelancerWallet,
            price: offer.amount
        }
        const contract = await this.contractService.newJob(newJobDto);

        const job = await this.jobService.acceptJob(offer.jobId, offer.freelancerWallet, contract.transactionHash);

        return new ApiResponseDto(true, { message: "Successfully accepted and the job created on blockchain", transaction: contract, job: job })
    }
}
