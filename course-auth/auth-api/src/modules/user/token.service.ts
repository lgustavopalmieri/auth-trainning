import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) protected readonly tokenRepo: Repository<Token>,
  ) {}

  async saveToken(body) {
    return await this.tokenRepo.save({
      ...body,
      created_at: new Date(),
    });
  }

  async findOneToken(options) {
    return await this.tokenRepo.findOne(options);
  }

  async deleteToken(options) {
    return await this.tokenRepo.delete(options);
  }
}
