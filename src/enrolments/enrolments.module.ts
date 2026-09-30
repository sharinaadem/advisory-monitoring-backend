import { Module } from '@nestjs/common';
import { EnrolmentsController } from './enrolments.controller.js';
import { EnrolmentsService } from './enrolments.service.js';

@Module({
  controllers: [EnrolmentsController],
  providers: [EnrolmentsService],
})
export class EnrolmentsModule {}
