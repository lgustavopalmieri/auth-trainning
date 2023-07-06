import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userRepo.find({
      where: [
        {
          email: createUserDto.email,
        },
      ],
    });

    if (userExists.length) {
      throw new BadRequestException({ message: 'This user already exists!' });
    }
    if (createUserDto.password !== createUserDto.password_confirm) {
      throw new BadRequestException({ message: 'Passwords doesnt match' });
    }
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.userRepo.save(newUser);
  }

  async login(loginDto: LoginUserDto, response: Response) {
    const user = await this.userRepo.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      { expiresIn: '15s' },
    );

    const refreshToken = await this.jwtService.signAsync({
      id: user.id,
    });

    // salva o refresh token na tabela do token
    const expired_at = new Date();
    expired_at.setDate(expired_at.getDate() + 7);

    await this.tokenService.saveToken({
      user_id: user.id,
      token: refreshToken,
      expired_at,
    });

    response.status(200);
    response.statusMessage = 'You are signed in';

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });
    return {
      user: user.email,
      token: accessToken,
    };
  }

  async user(request: Request) {
    try {
      const accessToken = request.headers.authorization.replace('Bearer ', '');

      const { id } = await this.jwtService.verifyAsync(accessToken);

      const { password, ...data } = await this.userRepo.findOne({ id });

      return data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async refresh(request: Request, response: Response) {
    try {
      const refresh_token = request.cookies['refresh_token'];

      const { id } = await this.jwtService.verifyAsync(refresh_token);

      // pega o refresh token daquele user na database do token
      const tokenEntity = await this.tokenService.findOneToken({
        user_id: id,
        expired_at: MoreThanOrEqual(new Date()),
      });

      if (!tokenEntity) {
        throw new UnauthorizedException({ message: 'invalid refresh token' });
      }

      const accessToken = await this.jwtService.signAsync(
        {
          id,
        },
        { expiresIn: '15s' },
      );

      response.status(200);
      response.statusMessage = 'You have a new token';

      const user = await this.userRepo.findOne(id);

      return {
        user: user.email,
        token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async logout(request: Request, response: Response) {
    const refresh_token = request.cookies['refresh_token'];

    await this.tokenService.deleteToken({ token: refresh_token });

    response.clearCookie('refresh_token');

    return {
      message: 'Logged out',
    };
  }

  async findOne(options) {
    return await this.userRepo.findOne(options);
  }

  async update(id: number, options) {
    return await this.userRepo.update(id, options);
  }

  async getAllUsers() {
    return await this.userRepo.find();
  }
}
