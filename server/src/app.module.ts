import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { OfferModule } from './offer/offer.module';
import { CommentModule } from './comment/comment.module';
import { ContractModule } from './contract/contract.module';
import { CategoryModule } from './category/category.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'freelance-chain'
    }),
    UserModule,
    JobsModule,
    OfferModule,
    CommentModule,
    ContractModule,
    CategoryModule,
    FavoriteModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
