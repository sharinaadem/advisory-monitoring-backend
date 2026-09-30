import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEnrolmentDto } from './dto/create-enrolment.dto.js';
import { UpdateEnrolmentDto } from './dto/update-enrolment.dto.js';
import { EnrolmentsService } from './enrolments.service.js';

@Controller()
export class EnrolmentsController {
  constructor(private readonly enrolmentsService: EnrolmentsService) {}

  @Get('enrolments')
  findAll() {
    return this.enrolmentsService.findAll();
  }

  @Get('students/:studentId/enrolments')
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.enrolmentsService.findByStudent(studentId);
  }

  @Post('enrolments')
  create(@Body() data: CreateEnrolmentDto) {
    return this.enrolmentsService.create(data);
  }

  @Patch('enrolments/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEnrolmentDto,
  ) {
    return this.enrolmentsService.update(id, data);
  }

  @Delete('enrolments/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enrolmentsService.remove(id);
  }
}
