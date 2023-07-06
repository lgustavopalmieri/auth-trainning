import { Controller, Post, Body } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Post('forgot')
  async save(@Body('email') email: string) {
    return await this.resetService.save(email);
  }

  @Post('reset')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    return await this.resetService.resetPassword(
      token,
      password,
      password_confirm,
    );
  }
}
