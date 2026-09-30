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
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';
import { SubjectsService } from './subjects.service.js';

@Controller()
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get('subjects')
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get('programs/:id/subjects')
  findByProgram(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.findByProgram(id);
  }

  @Post('subjects')
  create(@Body() data: CreateSubjectDto) {
    return this.subjectsService.create(data);
  }

  @Patch('subjects/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(id, data);
  }

  @Delete('subjects/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.remove(id);
  }
}