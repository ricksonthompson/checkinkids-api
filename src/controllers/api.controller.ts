import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('/api/feature')
  @HttpCode(HttpStatus.OK)
  async feature() {
    return {
      name: 'CHECKIN-KIDS-ACCESS',
    };
  }
}
