import { Module } from '@nestjs/common';
import { AdvisersController } from './advisers.controller.js';
import { AdvisersService } from './advisers.service.js';

@Module({
  controllers: [AdvisersController],
  providers: [AdvisersService],
})
export class AdvisersModule {}
