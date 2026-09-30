import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRemarkDto } from './dto/create-remark.dto.js';
import { UpdateRemarkDto } from './dto/update-remark.dto.js';

@Injectable()
export class RemarksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.remark.findMany({
      include: {
        student: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  findByStudent(studentId: number) {
    return this.prisma.remark.findMany({
      where: { studentId },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create(data: CreateRemarkDto) {
    const student = await this.prisma.student.findUnique({
      where: { id: data.studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student with id ${data.studentId} not found`);
    }

    return this.prisma.remark.create({
      data: {
        studentId: data.studentId,
        content: data.content,
        category: data.category,
      },
    });
  }

  async update(id: number, data: UpdateRemarkDto) {
    await this.ensureExists(id);

    return this.prisma.remark.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.ensureExists(id);

    return this.prisma.remark.delete({
      where: { id },
    });
  }

  private async ensureExists(id: number) {
    const remark = await this.prisma.remark.findUnique({
      where: { id },
    });

    if (!remark) {
      throw new NotFoundException(`Remark with id ${id} not found`);
    }
  }
}
