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
import { AdvisersService } from './advisers.service.js';

@Controller('advisers')
export class AdvisersController {
  constructor(private readonly advisersService: AdvisersService) {}

  @Get()
  findAll() {
    return this.advisersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.advisersService.findOne(id);
  }

  @Post()
  create(@Body() data: { name: string; programId: number }) {
    return this.advisersService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { name?: string; programId?: number },
  ) {
    return this.advisersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.advisersService.remove(id);
  }
}
