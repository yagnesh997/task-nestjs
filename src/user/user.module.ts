import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'
import config from '../config/index';
import { AccessTokenStrategy } from './strategies/accessToken.strategy'

@Module({
  imports: [PrismaModule,
    JwtModule.register({
      secret: config.secretkey,
      signOptions: { expiresIn: '24h' }
    })],
  controllers: [UserController],
  providers: [UserService, AccessTokenStrategy],
})
export class UserModule { }