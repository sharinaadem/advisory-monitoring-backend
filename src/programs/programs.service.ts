import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.program.findMany({
      include: {
        students: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.program.findUnique({
      where: { id },
      include: {
        students: true,
      },
    });
  }

  create(data: { code: string; name: string }) {
    return this.prisma.program.create({
      data,
    });
  }

  update(
    id: number,
    data: { code?: string; name?: string },
  ) {
    return this.prisma.program.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.program.delete({
      where: { id },
    });
  }
}