import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany({
      include: {
        program: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        program: true,
        remarks: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  create(data: {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  programId: number;
}) {
  return this.prisma.student.create({
    data,
  });
}

update(
  id: number,
  data: {
    studentId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    programId?: number;
  },
) {
  return this.prisma.student.update({
    where: { id },
    data,
  });
}

remove(id: number) {
  return this.prisma.student.delete({
    where: { id },
  });
}
}