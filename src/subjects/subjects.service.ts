import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { UpdateSubjectDto } from './dto/update-subject.dto.js';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.subject.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  findByProgram(programId: number) {
    return this.prisma.subject.findMany({
      where: {
        programId,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  create(data: CreateSubjectDto) {
    return this.prisma.subject.create({ data });
  }

  update(id: number, data: UpdateSubjectDto) {
    return this.prisma.subject.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.subject.delete({ where: { id } });
  }
}