import { Body, Controller, Get, HttpCode, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JWTAuthGuard } from './guards';
import { respond } from './Responsehandler/ResponseHandler';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JWTAuthGuard)
  @Get('/validate')
  async get(@Request() req, @Response() res) {
    const data = await this.authService.getUserDetails(req.user);
    respond(res, true, data);
  }

  @Post('/otp')
  async sendOTP(@Body() body: SendOtpDto, @Response() res) {
    const data = await this.authService.sendOTP(body);
    respond(res, true, data);
  }

  @Post('/verify-otp')
  @HttpCode(200)
  async verify(@Body() body: VerifyOtpDto, @Response() res) {
    const data = await this.authService.verifyOTP(body);
    respond(res, true, data);
  }

  @UseGuards(JWTAuthGuard)
  @Get('/logout')
  async logOut(@Request() req, @Response() res) {
    const data = await this.authService.logOut(req.user);
    respond(res, true, data, 'Logged Out Successfully');
  }
}
