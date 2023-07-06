import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateResetDto } from './dto/create-reset.dto';
import { UpdateResetDto } from './dto/update-reset.dto';
import { Reset } from './entities/reset.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetService {
  constructor(
    @InjectRepository(Reset)
    private readonly resetRepository: Repository<Reset>,
    private mailerService: MailerService,
    private userService: UserService,
  ) {}
  async save(email: string) {
    const token = Math.random().toString(20).substring(2, 12);

    //é preciso validar se esse email enviado pelo usuário existe na base de dados

    await this.resetRepository.save({
      email: email,
      token: token,
    });

    const url = `http://localhost:3000/reset/${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `Click <a href="${url}">here</a> here to reset your password`,
    });

    return {
      message: 'success',
    };
  }

  async resetPassword(
    token: string,
    password: string,
    password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const reset = await this.resetRepository.findOne({ token });

    const user = await this.userService.findOne({ email: reset.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userService.update(user.id, {
      password: await bcrypt.hash(password, 12),
    });

    // é preciso validar o token que sai daqui com o que chega no email e é passado para resetar
    return {
      message: 'password changed',
    };
  }
}
