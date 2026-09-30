import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateEnrolmentDto } from './dto/create-enrolment.dto.js';
import { UpdateEnrolmentDto } from './dto/update-enrolment.dto.js';

@Injectable()
export class EnrolmentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.enrolment.findMany({
      include: { student: true },
      orderBy: { id: 'asc' },
    });
  }

  findByStudent(studentId: number) {
    return this.prisma.enrolment.findMany({
      where: { studentId },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async create(data: CreateEnrolmentDto) {
    const student = await this.prisma.student.findUnique({
      where: { id: data.studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student with id ${data.studentId} not found`);
    }

    return this.prisma.enrolment.create({
      data: {
        studentId: data.studentId,
        academicYear: data.academicYear,
        semester: data.semester,
        status: data.status,
      },
    });
  }

  async update(id: number, data: UpdateEnrolmentDto) {
    await this.ensureExists(id);
    return this.prisma.enrolment.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.enrolment.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const enrolment = await this.prisma.enrolment.findUnique({ where: { id } });
    if (!enrolment) {
      throw new NotFoundException(`Enrolment with id ${id} not found`);
    }
  }
}
