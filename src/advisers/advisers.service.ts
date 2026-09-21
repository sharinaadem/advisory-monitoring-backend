import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AdvisersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.adviser.findMany({
      include: {
        program: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.adviser.findUnique({
      where: { id },
      include: {
        program: true,
      },
    });
  }

  create(data: { name: string; programId: number }) {
    return this.prisma.adviser.create({
      data,
    });
  }

  update(
    id: number,
    data: { name?: string; programId?: number },
  ) {
    return this.prisma.adviser.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.adviser.delete({
      where: { id },
    });
  }
}
