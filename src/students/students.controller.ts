import { StudentsService } from './students.service.js';
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

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post()
create(
  @Body()
  data: {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    programId: number;
  },
) {
  return this.studentsService.create(data);
}

@Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body()
  data: {
    studentId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    programId?: number;
  },
) {
  return this.studentsService.update(id, data);
}

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) {
  return this.studentsService.remove(id);
}
}