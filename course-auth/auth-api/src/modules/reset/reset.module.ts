import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reset } from './entities/reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reset]),
    MailerModule.forRoot({
      transport: {
        host: 'mailhog',
        port: 1025,
      },
      defaults: {
        from: 'from@example.com',
      },
    }),
    UserModule,
  ],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
