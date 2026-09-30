import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRemarkDto } from './dto/create-remark.dto.js';
import { UpdateRemarkDto } from './dto/update-remark.dto.js';
import { RemarksService } from './remarks.service.js';

@Controller('students')
export class RemarksController {
  constructor(private readonly remarksService: RemarksService) {}

  @Get('remarks')
  findAll() {
    return this.remarksService.findAll();
  }

  @Get(':id/remarks')
  findByStudent(@Param('id', ParseIntPipe) id: number) {
    return this.remarksService.findByStudent(id);
  }

  @Post('remarks')
  create(@Body() data: CreateRemarkDto) {
    return this.remarksService.create(data);
  }

  @Patch('remarks/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRemarkDto,
  ) {
    return this.remarksService.update(id, data);
  }

  @Put('remarks/:id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRemarkDto,
  ) {
    return this.remarksService.update(id, data);
  }

  @Delete('remarks/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.remarksService.remove(id);
  }
}
