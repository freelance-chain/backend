import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { ApiResponseDto } from 'src/common/dto/response.dto';
import { Types } from 'mongoose';
import { UpdateOfferDto } from './dto/updateOffer.dto';
import { ContractService } from 'src/contract/contract.service';
import { JobsService } from 'src/jobs/jobs.service';

@Controller('offer')
export class OfferController {
    constructor(
        private readonly offerService: OfferService,
        private readonly contractService: ContractService,
        private readonly jobService: JobsService
    ) { }

    @Post()
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        const newOffer = await this.offerService.newOffer(createOfferDto);

        return new ApiResponseDto(true, newOffer)
    }

    @Get('/user/:userId')
    async getUsersOffer(@Param('userId') userId: Types.ObjectId) {
        const offers = await this.offerService.getUsersOffer(userId);

        return new ApiResponseDto(true, offers)
    }

    @Get(':offerId')
    async getOfferById(@Param('offerId') offerId: Types.ObjectId) {
        const offer = await this.offerService.getOfferById(offerId);

        return new ApiResponseDto(true, offer)
    }

    @Put(':offerId')
    async updateOffer(@Param('offerId') offerId: Types.ObjectId, @Body() updateOfferDto: UpdateOfferDto) {
        const result = await this.offerService.updateOffer(offerId, updateOfferDto)

        return new ApiResponseDto(true, result)
    }

    @Delete(':offerId')
    async deleteOffer(@Param('offerId') offerId: Types.ObjectId) {
        const result = await this.offerService.deleteOffer(offerId)

        return new ApiResponseDto(true, result)
    }

    @Post('/accept/:offerId')
    async acceptOffer(@Param('offerId') offerId: Types.ObjectId) {
        const offer = await this.offerService.acceptOffer(offerId);

        // update job
        const job = await this.jobService.acceptJob(offer.jobId, offer.userId);

        // connect to smart contract
        const newJobDto = {
            id: String(job._id),
            employer: "0x7D2e4e17049b044B1BFe1a73635469690b3610Ac",
            employee: "0x7D2e4e17049b044B1BFe1a73635469690b3610Ac",
            price: job.budget
        }
        const contract = await this.contractService.newJob(newJobDto);
        console.log(contract);

        return new ApiResponseDto(true, { message: "Successfully accepted and the job created on blockchain", transaction: contract, job: job })
    }
}
