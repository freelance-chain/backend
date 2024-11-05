import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { contractAbi, contractAddress } from './contract.model';
import { Web3 } from 'web3';
import { NewJobDto } from './dto/newJob.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { Types } from 'mongoose';

@Injectable()
export class ContractService {
    private web3: Web3;
    private contract: any;
    private privateKey: string = process.env.PRIVATE_KEY;

    constructor() {
        const abi = contractAbi;
        this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_URL));
        this.contract = new this.web3.eth.Contract(abi, contractAddress);
    }

    async getAllJobs() {
        try {
            const result = await this.contract.methods.getJobs().call();
            console.log(result);

            return result;
        } catch (error) {
            console.error("Error: ", error);
            throw new Error("An error occured when trying to connect smart contract!");
        }
    }

    async newJob(newJobDto: NewJobDto): Promise<any> {
        try {
            const txData = await this.contract.methods.newJob(newJobDto.id, newJobDto).encodeABI();

            const nonce = await this.web3.eth.getTransactionCount(newJobDto.employer);

            const gasPrice = await this.web3.eth.getGasPrice();

            const estimatedGas = await this.web3.eth.estimateGas({
                from: newJobDto.employer,
                to: contractAddress,
                data: txData,
                value: this.web3.utils.toWei('0.001', 'ether')
            });

            const tx = {
                from: newJobDto.employer,
                to: contractAddress,
                data: txData,
                gas: estimatedGas,
                gasPrice: gasPrice,
                nonce: nonce,
                value: this.web3.utils.toWei("0.001", 'ether')
            };

            return this.returnSignPromise(tx)
        } catch (error) {
            console.error("Error : ", error);
            throw new HttpException(new ErrorResponseDto('An error occured when trying to connect smart contract!', HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getJob(jobId: Types.ObjectId): Promise<any> {
        try {
            const stringJobId = String(jobId)
            const result = await this.contract.methods.getJob(stringJobId);

            return result;
        } catch (error) {
            console.error("Error: ", error);
            throw new Error("An error occured when trying to connect smart contract!");
        }
    }

    async completeJob(jobId: Types.ObjectId, freelancerWallet: string): Promise<any> {
        try {
            const stringJobId = String(jobId)

            const txData = await this.contract.methods.completeJob(stringJobId).encodeABI();

            const nonce = await this.web3.eth.getTransactionCount(freelancerWallet);

            const gasPrice = await this.web3.eth.getGasPrice();

            const estimatedGas = await this.web3.eth.estimateGas({
                from: freelancerWallet,
                to: contractAddress,
                data: txData,
            });

            const tx = {
                from: freelancerWallet,
                to: contractAddress,
                data: txData,
                gas: estimatedGas,
                gasPrice: gasPrice,
                nonce: nonce,
            };

            return this.returnSignPromise(tx)
        } catch (error) {
            console.error("Error: ", error);
            throw new Error("An error occured when trying to connect smart contract!");
        }
    }

    async approveJob(jobId: Types.ObjectId, employerWallet: string): Promise<any> {
        try {
            const stringJobId = String(jobId)

            const txData = await this.contract.methods.approveJob(stringJobId).encodeABI();

            const nonce = await this.web3.eth.getTransactionCount(contractAddress);

            const gasPrice = await this.web3.eth.getGasPrice();

            const estimatedGas = await this.web3.eth.estimateGas({
                from: employerWallet,
                to: contractAddress,
                data: txData,
            });

            const tx = {
                from: employerWallet,
                to: contractAddress,
                data: txData,
                gas: estimatedGas,
                gasPrice: gasPrice,
                nonce: nonce,
            };

            return this.returnSignPromise(tx)
        } catch (error) {
            console.error("Error: ", error);
            throw new Error("An error occured when trying to connect smart contract!");
        }
    }

    private async returnSignPromise(tx: any) {
        const signPromise = this.web3.eth.accounts.signTransaction(tx, this.privateKey);
        signPromise
            .then((signedTx) => {
                this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    .on('receipt', (receipt) => {
                        console.log(receipt);
                    })
                    .on('error', console.error);
            })
            .catch((err) => {
                console.error('Promise failed:', err);
                throw new HttpException(new ErrorResponseDto('An error occured when trying to connect smart contract!', HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);

            });
        return signPromise;
    }
}
