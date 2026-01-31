import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('app')
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProtected() {
    return {
      message: 'Welcome to the application.',
    };
  }
}
